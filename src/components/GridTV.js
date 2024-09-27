import {useEffect, useRef} from "react";
import Video from "./Video";
import {useParams} from "react-router-dom";
import NumberKeyboard from "./NumberKeyboard";

const GridTV = ({channelsArray}) => {
    const playerRef = useRef({});
    const videoRef = useRef({});
    const currentChannel = useRef(0);
    const {style} = useParams();

    const handleMuted = (player) => {
        Object.entries(playerRef.current).forEach(([key, value]) => {
            if (key !== player) {
                value.muted(true);
            }
        });
        if (playerRef.current[player]) {
            playerRef.current[player].muted(false);
        }
        if (videoRef.current[player]) {
            videoRef.current[player].current.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    };

    useEffect(() => {
        const listener = (e) => {
            if (
                parseInt(e.key) >= 0 &&
                parseInt(e.key) <= Object.keys(playerRef.current).length
            ) {
                currentChannel.current = +e.key;
                handleMuted(e.key);
            }
            if (e.key === "ArrowRight") {
                if (
                    currentChannel.current <
                    Object.keys(playerRef.current).length
                ) {
                    currentChannel.current++;
                    handleMuted(currentChannel.current);
                } else if (
                    currentChannel.current ===
                    Object.keys(playerRef.current).length
                ) {
                    currentChannel.current = 1;
                    handleMuted(currentChannel.current);
                }
            }
            if (e.key === "ArrowLeft") {
                if (currentChannel.current > 1) {
                    currentChannel.current--;
                    handleMuted(currentChannel.current);
                } else if (currentChannel.current === 1) {
                    currentChannel.current = Object.keys(
                        playerRef.current
                    ).length;
                    handleMuted(currentChannel.current);
                }
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, [playerRef.current]);

    const defaultOptions = (src) => {
        return {
            muted: true,
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            liveui: true,
            sources: [
                {
                    src: src,
                    type: "application/x-mpegURL",
                },
            ],
        };
    };

    const styles = {
        grid: {
            screen: {flex: 1, height: "100%"},
            width: 200,
            container: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginRight: 10,
                marginLeft: 10,
                gap: 20,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                height: "20%",
            },
        },
        slider: {
            screen: {
                display: "flex",
                flex: 1,
                flexDirection: "column",
                height: "100%",
            },
            width: window.innerWidth * 0.9,
            container: {
                display: "flex",
                flexDirection: "row",
                marginRight: 10,
                marginLeft: 10,
                gap: 20,
                height: "100%",
            },
        },
    };

    return (
        <div style={styles[style || "slider"].screen}>
            <div style={{position: "relative", height: 90}}>
                <div style={{position: "fixed", top: 0, left: 0}}>
                    <NumberKeyboard onKeyPress={handleMuted} />
                </div>
            </div>
            <div style={styles[style || "slider"].container}>
                {channelsArray?.map((channel, index) => {
                    return (
                        <Video
                            options={defaultOptions(channel.url)}
                            key={channel.name}
                            getPlayer={(player, video) => {
                                playerRef.current[index + 1] = player;
                                videoRef.current[index + 1] = video;
                            }}
                            width={styles[style || "slider"].width}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default GridTV;

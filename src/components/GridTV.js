import {useEffect, useRef} from "react";
import Video from "./Video";
import {useParams} from "react-router-dom";
import NumberKeyboard from "./NumberKeyboard";

const GridTV = ({channelsArray}) => {
    const playerRef = useRef({});
    const playerContainerRef = useRef({});
    const videoRef = useRef({});
    const currentChannel = useRef(0);
    const {style} = useParams();

    const channelInputRef = useRef(""); // Store the accumulated channel input
    const debounceTimerRef = useRef(null); // Store the debounce timer

    const handleMuted = (player) => {
        Object.entries(playerRef.current).forEach(([key, value]) => {
            if (key !== player) {
                value.muted(true);
            }
        });
        const currentPlayer = playerRef.current[player];
        if (currentPlayer) {
            currentPlayer.muted(false);
            const isPlaying = !currentPlayer.paused();
            if (isPlaying) {
                currentPlayer.liveTracker.seekToLiveEdge(); // Go to live edge
            } else {
                currentPlayer.play(); // Start playing where it left off
            }
        }
        if (videoRef.current[player].current) {
            videoRef.current[player].current.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    };

    const handleChannelInput = () => {
        const channelNumber = parseInt(channelInputRef.current, 10);
        if (
            channelNumber >= 0 &&
            channelNumber <= Object.keys(playerRef.current).length
        ) {
            if (channelNumber !== 0) {
                currentChannel.current = channelNumber;
            }
            handleMuted(channelNumber);
        }
        channelInputRef.current = ""; // Clear the accumulated input after processing
    };

    const listener = (e) => {
        if (e.key === "mute") {
            channelInputRef.current = "";
            handleMuted(0);
        }

        if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
            channelInputRef.current += e.key;

            // Clear the previous debounce timer
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }

            // Set a new debounce timer
            debounceTimerRef.current = setTimeout(() => {
                handleChannelInput();
            }, 500);
        }
        if (e.key === "ArrowRight") {
            if (
                currentChannel.current < Object.keys(playerRef.current).length
            ) {
                currentChannel.current++;
                handleMuted(currentChannel.current);
            } else if (
                currentChannel.current === Object.keys(playerRef.current).length
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
                currentChannel.current = Object.keys(playerRef.current).length;
                handleMuted(currentChannel.current);
            }
        }
        if (e.key === "grid") {
            if (videoRef.current[currentChannel.current]) {
                videoRef.current[currentChannel.current].current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center",
                });
            }
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", listener);

        const handleResize = () => {
            if (playerRef.current) {
                videoRef.current[
                    currentChannel.current
                ]?.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center",
                });
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("keydown", listener);
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [playerRef.current, currentChannel.current]);

    const defaultOptions = (src) => {
        return {
            muted: true,
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            liveui: true,
            liveTracker: {
                liveTolerance: 15,
            },
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
                justifyContent: "center",
                alignItems: "flex-start",
                height: "20%",
                positions: "relative",
                marginTop: 45,
            },
        },
        slider: {
            screen: {
                display: "flex",
                height: "100%",
            },
            width: window.innerWidth * 0.9,
            container: {
                marginTop: 45,
                marginBottom: 45,
                display: "flex",
                flexDirection: "row",
                gap: 20,
                flex: 1,
                positions: "relative",
            },
        },
    };

    return (
        <div style={styles[style || "slider"].screen}>
            <div style={{position: "relative"}}>
                <div
                    className="no-events"
                    style={{
                        position: "fixed",
                        display: "flex",
                        flexDirection: "row",
                        pointerEvents: "fill",
                        top: 0,
                        left: 0,
                        height: 0,
                        zIndex: 100,
                    }}
                >
                    <NumberKeyboard
                        onKeyPress={listener}
                        channels={channelsArray}
                        style={style}
                        changeVideoSize={(newSize)=>{
                            playerContainerRef.current.style.height = newSize;
                        }}
                    />
                </div>
            </div>
            <div ref={playerContainerRef} style={styles[style || "slider"].container}>
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

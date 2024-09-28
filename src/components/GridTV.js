import {useEffect, useRef} from "react";
import Video from "./Video";
import {useParams} from "react-router-dom";
import NumberKeyboard from "./NumberKeyboard";

const GridTV = ({ channelsArray }) => {
    const playerRef = useRef({});
    const videoRef = useRef({});
    const currentChannel = useRef(0);
    const { style } = useParams();

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
        if (videoRef.current[player]) {
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
            currentChannel.current = channelNumber;
            handleMuted(channelNumber);
        }
        channelInputRef.current = ""; // Clear the accumulated input after processing
    };

    const listener = (e) => {
        if (e.key === "mute") {
            channelInputRef.current="";
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
    useEffect(() => {
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
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
            screen: { flex: 1, height: "100%" },
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
                justifyContent: "space-between",
                height: "100%",
            },
            width: window.innerWidth * 0.9,
            container: {
                display: "flex",
                flexDirection: "row",
                marginRight: 10,
                marginLeft: 10,
                gap: 20,
                flex: 1,
            },
        },
    };

    return (
        <div style={styles[style || "slider"].screen}>
            <div style={{ position: "relative" }}>
                <div
                    style={{
                        position: "fixed",
                        display: "flex",
                        flexDirection: "row",
                        top: 0,
                        left: 0,
                        height: 90,
                        zIndex: 100,
                    }}
                >
                    <NumberKeyboard onKeyPress={listener} channels={channelsArray} />
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

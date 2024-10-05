import React, {useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import Video from "./VideoJS";
import NumberKeyboard, { DisplayTypes } from "./NumberKeyboard";
import "./GridTV.css";

interface Channel {
    name: string;
    channel: number;
    url: string;
    img: string;
}

interface GridTVProps {
    channelsArray: Channel[];
}

type PlayerRef = {
    [key: number]: any; // Replace `any` with the type of your video player instance if available
};

type VideoRef = {
    [key: number]: React.RefObject<HTMLDivElement>;
};

const GridTV: React.FC<GridTVProps> = ({channelsArray}) => {
    const playerRef = useRef<PlayerRef>({});
    const playerContainerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<VideoRef>({});
    const currentChannel = useRef<number>(0);
    const {style} = useParams<{style?: DisplayTypes}>();

    const channelInputRef = useRef<string>(""); // Store the accumulated channel input
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null); // Store the debounce timer

    const handleResize = () => {
        videoRef.current[currentChannel.current]?.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    };

    const handleMuted = (player: number) => {
        Object.entries(playerRef.current).forEach(([key, value]) => {
            if (parseInt(key) !== player) {
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
        videoRef.current[player]?.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
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

    const listener = (e: KeyboardEvent) => {
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
            videoRef.current[currentChannel.current]?.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    };

    const changeVideoSize = (newSize: string) => {
        if (playerContainerRef.current) {
            playerContainerRef.current.style.height = newSize;
            handleResize();
        }
    }

    const resetVideoSize = () => {
        if (playerContainerRef.current) {
            playerContainerRef.current.style.height = '';
        }
    }

    useEffect(() => {
        if (style === 'slider') {
            resetVideoSize();
        }
    },[style])

    useEffect(() => {
        window.addEventListener("keydown", listener);

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("keydown", listener);
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerRef.current, currentChannel.current]);

    const defaultOptions = (src: string) => {
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
                height: "35%",
                position: "relative",
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
                position: "relative",
            },
        },
    };

    return (
        <div className={`screen ${style === "grid" ? "grid-screen" : "slider-screen"}`}>
            <div style={{ position: "relative" }}>
                <div className="fixed-number-keyboard no-events">
                    <NumberKeyboard
                        onKeyPress={listener}
                        channels={channelsArray}
                        style={style as DisplayTypes}
                        changeVideoSize={changeVideoSize}
                    />
                </div>
            </div>
            <div
                ref={playerContainerRef}
                className={`${style === "grid" ? "grid-container" : "slider-container"}`}
            >
                {channelsArray?.map((channel, index) => (
                    <Video
                        options={defaultOptions(channel.url)}
                        key={channel.name}
                        getPlayer={(player, video) => {
                            playerRef.current[index + 1] = player;
                            videoRef.current[index + 1] = video;
                        }}
                        width={styles[style || "slider"].width}
                    />
                ))}
            </div>
        </div>
    );
    
};

export default GridTV;

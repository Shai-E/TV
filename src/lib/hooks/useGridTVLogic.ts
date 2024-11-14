import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { ControlsLayoutOptions, PlayerRef, VideoRef } from "../types";
import { useParams } from "react-router-dom";

const DEFAULT_IS_BY_INDEX = false;

export const useGridTVLogic = (channelsArray: { channel: number; url: string; name: string }[]) => {
    const playerRef = useRef<PlayerRef>({});
    const videoRef = useRef<VideoRef>({});
    const currentChannel = useRef<number>(0);
    const { style } = useParams<{ style?: string }>();
    const maxVideoHeightSizeRef = useRef('100');
    const [controlsLayout, setControlsLayout] = useState(ControlsLayoutOptions.SIDE);
    const channelInputRef = useRef<string>("");
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const playerContainerRef = useRef<HTMLDivElement | null>(null);
    const interactionHappened = useRef(false);

    const channelsMap = channelsArray.reduce((acc, channel, index) => {
        acc[channel.channel] = index + 1;
        return acc;
    }, {} as { [key: number]: number });

    const scrollIntoView = (player: number) => {
        videoRef.current[player]?.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }

    // Intersection Observer to to chaqnge the muted state of the video on scroll (sound focus)
    useEffect(()=>{
        if(interactionHappened.current && style === 'slider' && playerRef.current && playerContainerRef.current){            
            Object.entries(playerRef.current).forEach(([index, playerElementRef]) => {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                currentChannel.current = parseInt(index);
                                handleMuted(parseInt(index), false);
                            }
                        });
                    }, {threshold: 0.5});
                    observer.observe(playerElementRef.el());
            });
        }
    },[interactionHappened.current, style, playerRef.current, playerContainerRef.current]);

    const handleScreenResize = () => {
        scrollIntoView(currentChannel.current);
    };

    const handleMuted = (player: number, isScrollIntoView: boolean = true) => {
        Object.entries(playerRef.current).forEach(([key, value]) => {
            if (parseInt(key) !== player) {
                value.muted(true);
            }
        });
        const currentPlayer = playerRef.current[player];
        if (currentPlayer) {
            currentPlayer.muted(false);
            const isPlaying = !currentPlayer.paused();
            if (!interactionHappened.current) {
                interactionHappened.current = true;
            }
            if (isPlaying) {
                currentPlayer.liveTracker.seekToLiveEdge();
            } else {
                currentPlayer.play();
            }
        }
        isScrollIntoView && scrollIntoView(player);
    }

    const handleChannelInput = (isByIndex: boolean) => {
        const channelNumber = parseInt(channelInputRef.current, 10);
        const channelToUse = isByIndex ? channelNumber : channelsMap[channelNumber];
        if (channelToUse >= 0 && channelToUse <= Object.keys(playerRef.current).length) {
            if (channelToUse !== 0) {
                currentChannel.current = channelToUse;
            }
            handleMuted(channelToUse);
        }
        channelInputRef.current = "";
    };

    const listener = (e: KeyboardEvent<Element>, isByIndex: boolean | undefined = DEFAULT_IS_BY_INDEX) => {
        if (e.key === "mute") {
            channelInputRef.current = "";
            handleMuted(0);
        }

        if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
            channelInputRef.current += e.key;
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            debounceTimerRef.current = setTimeout(() => {
                handleChannelInput(isByIndex);
            }, 500);
        }
        if (e.key === "ArrowRight") {
            if (currentChannel.current < Object.keys(playerRef.current).length) {
                currentChannel.current++;
                handleMuted(currentChannel.current);
            } else if (currentChannel.current === Object.keys(playerRef.current).length) {
                currentChannel.current = 1;
                handleMuted(currentChannel.current);
            }
        }
        if (e.key === "ArrowLeft") {
            if (currentChannel.current > 1) {
                currentChannel.current--;
                handleMuted(currentChannel.current);
            } else if (currentChannel.current <= 1) {
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

    const resetVideoSize = () => {
            if (playerContainerRef.current) {
                playerContainerRef.current.style.height = "";
            }
        };

    useEffect(() => {
        if (style === "slider") {
            resetVideoSize();
        }
    }, [style]);

    const changeVideoSize = (newSize: string) => {
        if (playerContainerRef.current) {
            if ((videoRef.current[1]?.current?.clientWidth || 0) < playerContainerRef.current.clientWidth || parseInt(newSize) < parseInt(maxVideoHeightSizeRef.current)) {
                maxVideoHeightSizeRef.current = newSize;
            }
            playerContainerRef.current.style.height = maxVideoHeightSizeRef.current;
            handleScreenResize();
        }
    };

    useEffect(() => {
        const isByIndex = true;
        const listenerWithPreference: EventListener = (e: Event) => listener(e as unknown as KeyboardEvent, isByIndex);
        window.addEventListener("keydown", listenerWithPreference);

        handleScreenResize();

        window.addEventListener("resize", handleScreenResize);

        return () => {
            window.removeEventListener("resize", handleScreenResize);
            window.removeEventListener("keydown", listenerWithPreference);
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerRef.current, currentChannel.current]);

    return {
        playerRef,
        videoRef,
        playerContainerRef,
        currentChannel,
        style,
        controlsLayout,
        setControlsLayout,
        handleScreenResize,
        handleMuted,
        listener,
        changeVideoSize,
        resetVideoSize,
    };
};

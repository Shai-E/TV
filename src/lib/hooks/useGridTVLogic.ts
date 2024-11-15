import {useEffect, useRef, useState, KeyboardEvent} from "react";
import {ControlsLayoutOptions, PlayerRef, VideoRef} from "../types";
import {useParams} from "react-router-dom";

const DEFAULT_IS_BY_INDEX = false;
const KEYBOARD_PRESS_DELAY = 800;

export const useGridTVLogic = (
    channelsArray: {channel: number; url: string; name: string}[]
) => {
    const playerRef = useRef<PlayerRef>({});
    const videoRef = useRef<VideoRef>({});
    const currentChannel = useRef<number>(0);
    const {style} = useParams<{style?: string}>();
    const maxVideoHeightSizeRef = useRef("100");
    const [controlsLayout, setControlsLayout] = useState(
        ControlsLayoutOptions.SIDE
    );
    const channelInputRef = useRef<string>("");
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const playerContainerRef = useRef<HTMLDivElement | null>(null);
    const observersRef = useRef<Record<number, IntersectionObserver>>({});
    const mutedStateRef = useRef<boolean>(false);

    const channelsMap = channelsArray.reduce((acc, channel, index) => {
        acc[channel.channel] = index + 1;
        return acc;
    }, {} as {[key: number]: number});

    const scrollIntoView = (player: number) => {
        videoRef.current[player]?.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    };

    useEffect(() => {
        if (
            style === "slider" &&
            playerRef.current &&
            playerContainerRef.current
        ) {
            Object.entries(playerRef.current).forEach(
                ([index, playerElementRef]) => {
                    if (observersRef.current[+index]) {
                        return;
                    }
                    const observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    currentChannel.current = parseInt(index);
                                    handleMuted(parseInt(index), false);
                                }
                            });
                        },
                        {threshold: 0.5}
                    );
                    observer.observe(playerElementRef.el());
                }
            );
        }
        if (
            style === "grid" &&
            playerRef.current &&
            playerContainerRef.current
        ) {
            handleMuted(currentChannel.current);
        }
        return () => {
            Object.values(observersRef.current).forEach((observer) => {
                observer.disconnect();
            });
        };
    }, [
        style,
        playerRef.current,
        playerContainerRef.current,
        mutedStateRef.current,
    ]);

    const handleScreenResize = () => {
        scrollIntoView(currentChannel.current);
    };

    const muteAllPlayers = () => {
        Object.entries(playerRef.current).forEach(([key, value]) => {
            value.muted(true);
        });
    };

    const muteAllPlayersExcept = (player: number) => {
        Object.entries(playerRef.current).forEach(([key, value]) => {
            value.muted(mutedStateRef.current || parseInt(key) !== player);
        });
    };

    const handleMuted = (player: number, isScrollIntoView: boolean = true) => {
        muteAllPlayersExcept(player);
        const currentPlayer = playerRef.current[player];
        if (currentPlayer) {
            const isPlaying = !currentPlayer.paused();
            if (isPlaying) {
                currentPlayer.liveTracker.seekToLiveEdge();
            } else {
                currentPlayer.play();
            }
        }
        isScrollIntoView && scrollIntoView(player);
    };

    const clearChannelInput = () => {
        channelInputRef.current = "";
    }

    const handleChannelInput = (isByIndex: boolean, isMuted: boolean) => {
        const isChannelKeyActivated = channelInputRef.current[0] === "C";
        if (isChannelKeyActivated) {
            channelInputRef.current = channelInputRef.current.slice(1);
            isByIndex = false;
        }        
        const channelNumber = parseInt(channelInputRef.current, 10);
        const channelToUse = isByIndex
            ? channelNumber
            : channelsMap[channelNumber];
        if (
            channelToUse >= 0 &&
            channelToUse <= Object.keys(playerRef.current).length
        ) {
            if (channelToUse !== 0) {
                currentChannel.current = channelToUse;
            }
            handleMuted(channelToUse);
        }
        clearChannelInput();
    };

    const listener = (
        e: KeyboardEvent<Element>,
        isByIndex: boolean | undefined = DEFAULT_IS_BY_INDEX,
        noDelay: boolean = false
    ) => {
        if (e?.preventDefault) e?.preventDefault();
        const isMuted = mutedStateRef.current;
        if (noDelay) {
            channelInputRef.current = e.key;
            handleChannelInput(isByIndex, isMuted);
            return;
        }
        if (e.key === "mute") {
            if (isMuted) {
                mutedStateRef.current = false;
                handleMuted(currentChannel.current);
            } else {
                clearChannelInput();
                mutedStateRef.current = true;
                muteAllPlayers();
            }
            return;
        }

        if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
            channelInputRef.current += e.key;
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            debounceTimerRef.current = setTimeout(() => {
                handleChannelInput(isByIndex, isMuted);
            }, KEYBOARD_PRESS_DELAY);
            return;
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
            return;
        }
        if (e.key === "ArrowLeft") {
            if (currentChannel.current > 1) {
                currentChannel.current--;
                handleMuted(currentChannel.current);
            } else if (currentChannel.current <= 1) {
                currentChannel.current = Object.keys(playerRef.current).length;
                handleMuted(currentChannel.current);
            }
            return;
        }
        if (e.key === "ArrowDown") {
            if (currentChannel.current === Object.keys(playerRef.current).length) return;
            currentChannel.current = Object.keys(playerRef.current).length;
            handleMuted(currentChannel.current);
            return;
        }
        if (e.key === "ArrowUp") {
            if (currentChannel.current === 1) return;
            currentChannel.current = 1;
            handleMuted(currentChannel.current);
            return;
        }
        if (e.key === "grid") {
            scrollIntoView(currentChannel.current);
            return;
        }
        if (e?.code && e.code === "KeyC") {
            channelInputRef.current = "C";
            return;
        }
        if (e?.code && e.code === "KeyM") {            
            mutedStateRef.current = !mutedStateRef.current;
            if(mutedStateRef.current) {
                muteAllPlayers();
            } else {
                handleMuted(currentChannel.current);
            }
            return;
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
            if (
                (videoRef.current[1]?.current?.clientWidth || 0) <
                    playerContainerRef.current.clientWidth ||
                parseInt(newSize) < parseInt(maxVideoHeightSizeRef.current)
            ) {
                maxVideoHeightSizeRef.current = newSize;
            }
            playerContainerRef.current.style.height =
                maxVideoHeightSizeRef.current;
            handleScreenResize();
        }
    };

    useEffect(() => {
        const isByIndex = true;
        const listenerWithPreference: EventListener = (e: Event) =>
            listener(e as unknown as KeyboardEvent, isByIndex);
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

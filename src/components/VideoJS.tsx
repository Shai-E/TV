import React, {useEffect, useRef} from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./VideoJS.css";

// Define types for VideoJsPlayer and VideoJsPlayerOptions
type VideoJsPlayer = any;
type VideoJsPlayerOptions = any;

interface VideoJSProps {
    options: VideoJsPlayerOptions;
    onReady?: (player: VideoJsPlayer) => void;
    getPlayer: (
        player: VideoJsPlayer | null,
        videoRef: React.RefObject<HTMLDivElement>
    ) => void;
    width: React.CSSProperties["width"];
}

const VideoJS: React.FC<VideoJSProps> = ({options, onReady, getPlayer}) => {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<VideoJsPlayer | null>(null);

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");
            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current?.appendChild(videoElement);

            const player = (playerRef.current = videojs(
                videoElement,
                options,
                () => {
                    videojs.log("player is ready");
                    onReady && onReady(player);
                }
            ));
        } else {
            const player = playerRef.current;
            player.autoplay(options.autoplay || false);
            player.src(options.sources || []);
        }

        const handleResize = () => {
            if (videoRef.current) {
                videoRef.current.style.maxWidth = `${window.innerWidth}px`;
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [options, onReady]);

    useEffect(() => {
        const player = playerRef.current;
        getPlayer(player, videoRef);

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [getPlayer]);

    return (
        <div data-vjs-player className="data-vjs-player">
            <div ref={videoRef} className="video-container" />
        </div>
    );
};

export default VideoJS;

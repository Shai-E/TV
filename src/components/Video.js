import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoJS = (props) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const {options, onReady, getPlayer} = props;

    React.useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
            const videoElement = document.createElement("video-js");

            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current.appendChild(videoElement);

            const player = (playerRef.current = videojs(
                videoElement,
                options,
                () => {
                    videojs.log("player is ready");
                    onReady && onReady(player);
                }
            ));

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(options.sources);
        }

        // resize handling
        const handleResize = () => {
            if (videoRef.current) {
                videoRef.current.style.maxWidth = `${window.innerWidth}px`;
            }
        };

        // Set initial maxWidth
        handleResize();

        // Add resize event listener
        window.addEventListener("resize", handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
        // resize handling end
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;
        getPlayer(player, videoRef);

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player style={{height: "100%"}}>
            <div
                ref={videoRef}
                style={{
                    aspectRatio: 16 / 9,
                    height: "100%",
                    maxWidth: window.innerWidth,
                }}
            />
        </div>
    );
};

export default VideoJS;
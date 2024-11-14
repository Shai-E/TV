export const getVideoDefaultOptions = (src: string) => {
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
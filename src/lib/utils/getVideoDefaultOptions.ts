export const getVideoDefaultOptions = (src: string, srcType: string = "application/x-mpegURL") => {
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
                type: srcType,
            },
        ],
    };
};
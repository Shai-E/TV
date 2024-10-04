declare module 'Video' {
    import React from 'react';

    interface VideoProps {
        options: any; // Replace `any` with a more specific type if available
        getPlayer: (player: any, video: React.RefObject<HTMLDivElement>) => void;
        width: number;
    }

    const Video: React.FC<VideoProps>;
    export default Video;
}
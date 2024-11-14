import React from "react";

export interface Channel {
    name: string;
    channel: number;
    url: string;
    img: string;
}

export interface GridTVProps {
    channelsArray: Channel[];
}

export type PlayerRef = {
    [key: number]: any; // Replace `any` with the type of your video player instance if available
};

export type VideoRef = {
    [key: number]: React.RefObject<HTMLDivElement>;
};

export enum ControlsLayoutOptions {
    SIDE = 'side',
    FLOAT = 'float'
}
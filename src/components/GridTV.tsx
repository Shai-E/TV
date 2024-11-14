import React from "react";
// components
import Video from "./VideoJS";
import NumberKeyboard, {DisplayTypes} from "./NumberKeyboard";
import SideControls from "./SideControls";
// style
import "./GridTV.css";
// types
import { ControlsLayoutOptions, GridTVProps} from "../lib/types";
import { useGridTVLogic } from "../lib/hooks/useGridTVLogic";
// utils
import { getVideoDefaultOptions } from "../lib/utils/getVideoDefaultOptions";

const GridTV: React.FC<GridTVProps> = ({channelsArray}) => {
    const { playerRef,
        videoRef,
        playerContainerRef,
        style,
        controlsLayout,
        changeVideoSize,
        listener,
    } = useGridTVLogic(channelsArray);

    const DynamicControls = controlsLayout === ControlsLayoutOptions.SIDE ? SideControls : NumberKeyboard

    return (
        <div
            className={`screen ${
                style === "grid" ? "grid-screen" : "slider-screen"
            }`}
        >
            <div style={{position: "relative"}}>
                    <DynamicControls
                        onKeyPress={listener}
                        channels={channelsArray}
                        style={style as DisplayTypes}
                        changeVideoSize={changeVideoSize}
                    />
            </div>
            <div
                ref={playerContainerRef}
                className={`${
                    style === "grid" ? "grid-container" : "slider-container"
                }`}
            >
                {channelsArray?.map((channel, index) => (
                    <Video
                        options={getVideoDefaultOptions(channel.url)}
                        key={channel.name}
                        getPlayer={(player, video) => {
                            playerRef.current[index + 1] = player;
                            videoRef.current[index + 1] = video;
                        }}
                        width={style === 'grid' ? 200 : window.innerWidth * 0.9}
                    />
                ))}
            </div>
        </div>
    );
};

export default GridTV;

import React from "react";
import {useNavigate} from "react-router-dom";
import gridIcon from "../assets/svg/grid.svg";
import sliderIcon from "../assets/svg/slider.svg";
import {remoteButtons} from "../data/remoteButtons";
import "./SideControls.css";

interface Channel {
    name: string;
    img: string;
}

export type DisplayTypes = "grid" | "slider";

interface SideControlsProps {
    onKeyPress: (e: KeyboardEvent) => void;
    channels: Channel[];
    style: DisplayTypes;
    changeVideoSize: (size: string) => void;
}

const icons = {
    grid: gridIcon,
    slider: sliderIcon,
};

const SideControls: React.FC<SideControlsProps> = ({
    onKeyPress,
    channels,
    style,
    changeVideoSize,
}) => {
    const otherStyle = style === "grid" ? "slider" : "grid";

    const navigate = useNavigate();

    const handleButtonClick = (number: string) => {
        onKeyPress({key: number} as KeyboardEvent);
    };

    return (
        <div className="side-fixed-number-keyboard">

            <label htmlFor="sidebar" className="hamburger-menu">
                <input name="sidebar" id="sidebar" type="checkbox" />
            </label>
            <div className={"side-controls-bar keyboard"}>
                <div>
                    <div className="keyboard-content">
                        {remoteButtons.map((number) => (
                            <button
                                key={number.value}
                                className="button active-events no-select"
                                onClick={() => handleButtonClick(number.value)}
                            >
                                {number.symbol}
                            </button>
                        ))}
                    </div>
                    <div className="keyboard-content">
                        <button
                            key={style}
                            className="button active-events no-select"
                            onClick={() => {
                                navigate("/" + otherStyle);
                            }}
                        >
                            <img
                                src={icons[otherStyle]}
                                width="20"
                                height="20"
                                alt={otherStyle}
                            />
                        </button>
                        <button
                            key={"mute"}
                            className="button active-events no-select"
                            onClick={() => handleButtonClick("mute")}
                        >
                            {"🔇"}
                        </button>
                    </div>
                </div>
                <div className="vid-size-slider-container active-events">
                    {style === "grid" && (
                        <input
                            type="range"
                            defaultValue={35}
                            min={20}
                            max={100}
                            onChange={(e) => {
                                const newValue = e.currentTarget.value + "%";
                                changeVideoSize(newValue);
                            }}
                        />
                    )}
                </div>
                <div className="no-events channels-container">
                    {channels.map((channel, index) => (
                        <button
                            key={channel.name}
                            className="button channel-button active-events no-select"
                            style={{
                                backgroundImage: `url(${channel.img})`,
                            }}
                            onClick={() =>
                                handleButtonClick((index + 1).toString())
                            }
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideControls;
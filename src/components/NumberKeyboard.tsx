import React from "react";
import {useNavigate} from "react-router-dom";
import gridIcon from "../assets/svg/grid.svg";
import sliderIcon from "../assets/svg/slider.svg";
import {useRemotes} from "../hooks/useRemotes";
import {remoteButtons} from "../data/remoteButtons";
import "./NumberKeyboard.css";

interface Channel {
    name: string;
    img: string;
}

export type DisplayTypes = "grid" | "slider";

interface NumberKeyboardProps {
    onKeyPress: (e: KeyboardEvent) => void;
    channels: Channel[];
    style: DisplayTypes;
    changeVideoSize: (size: string) => void;
}

const icons = {
    grid: gridIcon,
    slider: sliderIcon,
};

const NumberKeyboard: React.FC<NumberKeyboardProps> = ({
    onKeyPress,
    channels,
    style,
    changeVideoSize,
}) => {
    const otherStyle = style === "grid" ? "slider" : "grid";

    const navigate = useNavigate();

    const {
        keyboardRef,
        channelsRef,
        remoteButtonRef,
        channelsButtonRef,
        toggleRemote,
        toggleChannels,
    } = useRemotes();

    const handleButtonClick = (number: string) => {
        onKeyPress({key: number} as KeyboardEvent);
    };

    return (
        <div className={"controls-bar keyboard no-events"}>
            <div className="no-events">
                <button
                    ref={remoteButtonRef}
                    key={"^"}
                    className={"expand remote-button active-events"}
                    onClick={toggleRemote}
                />
                <div ref={keyboardRef} className="keyboard-container no-events">
                    <div className="keyboard-content no-events">
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
                    <div className="keyboard-content no-events">
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
                    </div>
                </div>
            </div>
            <div className="active-events">
                <button
                    ref={channelsButtonRef}
                    key={"^"}
                    className={"expand-channels channels-button active-events"}
                    onClick={toggleChannels}
                />
                <div ref={channelsRef} className="no-events channels-container">
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

export default NumberKeyboard;

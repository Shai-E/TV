import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import gridIcon from "../assets/svg/grid.svg";
import sliderIcon from "../assets/svg/slider.svg";

const icons = {
    grid: gridIcon,
    slider: sliderIcon,
};

const NumberKeyboard = ({onKeyPress, channels, style}) => {
    const otherStyle = style === "grid" ? "slider" : "grid";

    const remoteButtons = [
        {value: "1", symbol: "1"},
        {value: "2", symbol: "2"},
        {value: "3", symbol: "3"},
        {value: "4", symbol: "4"},
        {value: "5", symbol: "5"},
        {value: "6", symbol: "6"},
        {value: "7", symbol: "7"},
        {value: "8", symbol: "8"},
        {value: "9", symbol: "9"},
        {value: "ArrowLeft", symbol: "⏪"},
        {value: "0", symbol: "0"},
        {value: "ArrowRight", symbol: "⏩"},
    ];

    const navigate = useNavigate();
    const keyboardRef = useRef(null);
    const channelsRef = useRef(null);
    const remoteButtonRef = useRef(null);
    const channelsButtonRef = useRef(null);

    const handleButtonClick = (number) => {
        onKeyPress({key: number});
    };

    const toggleRemote = () => {
        const keyboard = keyboardRef.current;
        const button = remoteButtonRef.current;
        if (keyboard.classList.contains("hidden")) {
            keyboard.classList.remove("hidden");
            keyboard.classList.add("visible");
            button.classList.remove("shrink");
            button.classList.add("expand");
        } else {
            keyboard.classList.remove("visible");
            keyboard.classList.add("hidden");
            button.classList.remove("expand");
            button.classList.add("shrink");
        }
    };

    const toggleChannels = () => {
        const channels = channelsRef.current;
        const button = channelsButtonRef.current;
        if (channels.classList.contains("hidden")) {
            channels.classList.remove("hidden");
            channels.classList.add("visible");
            button.classList.remove("shrink-channels");
            button.classList.add("expand-channels");
        } else {
            channels.classList.remove("visible");
            channels.classList.add("hidden");
            button.classList.remove("expand-channels");
            button.classList.add("shrink-channels");
        }
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
                <div
                    ref={keyboardRef}
                    className="no-events"
                    style={{position: "absolute"}}
                >
                    <div
                        className="no-events"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: 250,
                            justifyContent: "space-around",
                            padding: "10px",
                        }}
                    >
                        {remoteButtons.map((number) => (
                            <button
                                key={number.value}
                                className="active-events no-select"
                                style={styles.button}
                                onClick={() => handleButtonClick(number.value)}
                            >
                                {number.symbol}
                            </button>
                        ))}
                    </div>
                    <div
                        className="no-events"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: 250,
                            justifyContent: "space-around",
                            padding: "10px",
                        }}
                    >
                        <button
                            key={style}
                            style={styles.button}
                            className="active-events no-select"
                            onClick={() => {
                                navigate("/" + otherStyle);
                            }}
                        >
                            <img
                                src={icons[otherStyle]}
                                width="20"
                                height="20"
                                alt="grid"
                            />
                        </button>
                        <button
                            key={"0"}
                            style={styles.button}
                            className="active-events no-select"
                            onClick={() => handleButtonClick("mute")}
                        >
                            {"🔇"}
                        </button>
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
                <div ref={channelsRef} className="no-events">
                    {channels.map((channel, index) => (
                        <button
                            key={channel.name}
                            className="active-events no-select active-events"
                            style={{
                                ...styles.button,
                                ...{
                                    backgroundImage: `url(${channel.img})`,
                                    backgroundSize: "contain",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    zIndex: 101,
                                    position: "relative",
                                },
                            }}
                            onClick={() => handleButtonClick(index + 1)}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    button: {
        padding: "15px 25px",
        height: "60px",
        width: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontSize: "18px",
        cursor: "pointer",
        margin: "5px",
        borderRadius: "50%",
        border: "1px solid #ccc",
        backgroundColor: "white",
        position: "relative",
    },
};

export default NumberKeyboard;

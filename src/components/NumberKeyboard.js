import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import gridIcon from "../assets/svg/grid.svg";
import sliderIcon from "../assets/svg/slider.svg";

const NumberKeyboard = ({onKeyPress, channels}) => {
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
    const buttonRef = useRef(null);

    const handleButtonClick = (number) => {
        onKeyPress({key: number});
    };

    const toggleKeyboard = () => {
        const keyboaard = keyboardRef.current;
        const button = buttonRef.current;
        if (keyboaard.classList.contains("hidden")) {
            keyboaard.classList.remove("hidden");
            keyboaard.classList.add("visible");
            button.classList.remove("shrink");
            button.classList.add("expand");
        } else {
            keyboaard.classList.remove("visible");
            keyboaard.classList.add("hidden");
            button.classList.remove("expand");
            button.classList.add("shrink");
        }
    };

    return (
        <div style={styles.keyboardRow} className={"keyboard"}>
            <button
                ref={buttonRef}
                key={"^"}
                className={"expand"}
                onClick={toggleKeyboard}
            >
                {""}
            </button>
            <div ref={keyboardRef}>
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
                 style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: 250,
                    justifyContent: "space-around",
                    padding: "10px",
                }}>

                <button
                    key={"grid"}
                    style={styles.button}
                    className="active-events no-select"
                    onClick={() => {
                        navigate("/grid");
                    }}
                >
                    <img src={gridIcon} width="20" height="20" alt="grid" />
                </button>
                <button
                    key={"0"}
                    style={styles.button}
                    className="active-events no-select"
                    onClick={() => handleButtonClick("mute")}
                >
                    {"🔇"}
                </button>
                <button
                    key={"slider"}
                    style={styles.button}
                    className="active-events no-select"
                    onClick={() => {
                        navigate("/slider");
                    }}
                >
                    <img src={sliderIcon} width="23" height="20" alt="slider" />
                </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    keyboardRow: {
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
    },
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
        backgroundColor: "#f1f1f1",
    },
};

export default NumberKeyboard;

import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";

const NumberKeyboard = ({onKeyPress}) => {
    const numbers = Array.from({length: 10}, (_, i) => i);
    const navigate = useNavigate();
    const keyboardRef = useRef(null);
    const buttonRef = useRef(null);

    const handleButtonClick = (number) => {
        onKeyPress(number);
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
            <button ref={buttonRef} key={"^"} className={"expand"} onClick={toggleKeyboard}>
                {"^"}
            </button>
            <div ref={keyboardRef}>
                {numbers.map((number) => (
                    <button
                        key={number}
                        style={styles.button}
                        onClick={() => handleButtonClick(number)}
                    >
                        {number}
                    </button>
                ))}
                <button
                    key={"grid"}
                    style={styles.button}
                    onClick={() => {
                        navigate("/grid");
                    }}
                >
                    {"grid"}
                </button>
                <button
                    key={"slider"}
                    style={styles.button}
                    onClick={() => {
                        navigate("/slider");
                    }}
                >
                    {"slider"}
                </button>
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
        height: "50px",
        fontSize: "18px",
        cursor: "pointer",
        margin: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        backgroundColor: "#f1f1f1",
    },
};

export default NumberKeyboard;

import { useNavigate } from "react-router-dom";
export type DisplayTypes = "grid" | "slider";

export const useChangeStyle = (style: DisplayTypes) => {
    const otherStyle: DisplayTypes = style === "grid" ? "slider" : "grid";

    const navigate = useNavigate();

    const changeStyle = (style: DisplayTypes = otherStyle) => {
        navigate("/" + style);
    }

    return { otherStyle, changeStyle };
}
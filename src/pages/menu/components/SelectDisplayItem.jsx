import React from "react";

const SelectDisplayItem = ({ imageSrc, isSelected, glowColor, onClick, width = 48, height = 48, scale = 2 }) => {
    return (
        <img
            src={imageSrc}
            style={{
                width: width,
                height: height,
                imageRendering: "pixelated",
                cursor: "pointer",
                transform: isSelected ? "scale(" + scale + ")" : "scale(1)",
                filter: isSelected ? "drop-shadow(0 0 10px " + glowColor + ")" : "none",
                transition: "transform 0.25s, filter 0.25s"
            }}
            onClick={onClick}
        />
    )
}

export default SelectDisplayItem;
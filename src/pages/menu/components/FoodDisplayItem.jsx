import React from "react";

const FoodDisplayItem = ({ imageSrc, isSelected, glowColor, onClick }) => {
    return (
        <img
            src={imageSrc}
            style={{
                width: "48px",
                height: "48px",
                imageRendering: "pixelated",
                cursor: "pointer",
                transform: isSelected ? "scale(2)" : "scale(1)",
                filter: isSelected ? "drop-shadow(0 0 10px " + glowColor + ")" : "none",
                transition: "transform 0.25s, filter 0.25s"
            }}
            onClick={onClick}
        />
    )
}

export default FoodDisplayItem;
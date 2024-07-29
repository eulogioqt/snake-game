import React from "react";

import rotateScreenSrc from '/src/assets/rotateScreenSymbol.png';

import { useApp } from "../../app/AppContext";

import "../../../css/rotationAnimation.css";

const ChangeOrientationScreen = () => {
    const { CELL_SIZE } = useApp();

    return (
        <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: "#4A752C", zIndex: 200 }}>
            <img
                src={rotateScreenSrc}
                style={{
                    width: 4 * CELL_SIZE,
                    height: 4 * CELL_SIZE,
                    imageRendering: "pixelated",
                }}
                className="rotate-animation"
            />
        </div>
    );
};

export default ChangeOrientationScreen;

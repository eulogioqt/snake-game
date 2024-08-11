import React from "react";

import rotateScreenSrc from '/src/assets/images/rotateScreenSymbol.png';

import { useApp } from "../../../contexts/AppContext";
import { useSettings } from "../../../contexts/SettingsContext";

import { backgroundStyles } from "../../../contexts/SettingsContext";

import "../../../css/rotationAnimation.css";

const ChangeOrientationScreen = () => {
    const { CELL_SIZE } = useApp();
    const { backgroundStyleIndex } = useSettings();

    const backgroundStyle = backgroundStyles[backgroundStyleIndex];

    return (
        <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: backgroundStyle[3], zIndex: 200 }}>
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

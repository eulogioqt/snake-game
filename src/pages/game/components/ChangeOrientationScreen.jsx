import React from "react";

import rotateScreenSrc from '/src/assets/rotateScreenSymbol.png';

import { useApp } from "../../app/AppContext";
import { useSettings } from "../../menu/context/SettingsContext";

import "../../../css/rotationAnimation.css";

const ChangeOrientationScreen = () => {
    const { CELL_SIZE } = useApp();
    const { backgroundStyle } = useSettings();

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

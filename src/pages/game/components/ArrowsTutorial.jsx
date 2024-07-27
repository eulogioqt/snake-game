import React from "react";

import arrowsTutorialSrc from '/src/assets/arrowsTutorial.png';

import { useApp } from "../../app/AppContext";

const ArrowsTutorial = ({ condition = true }) => {
    const { CELL_SIZE } = useApp();

    const renderObj = <img src={arrowsTutorialSrc} style={{
        position: "absolute",
        width: CELL_SIZE * 4,
        height: CELL_SIZE * 4,
        top: CELL_SIZE * 3,
        imageRendering: 'pixelated'
    }} />;

    return condition && renderObj;
}

export default ArrowsTutorial;
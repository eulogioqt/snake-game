import React from "react";
import { useApp } from "../../../contexts/AppContext";

const InfoDisplayItem = ({ imageSrc, text }) => {
    const { CELL_SIZE } = useApp();

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <img style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                marginRight: CELL_SIZE / 4,
                imageRendering: 'pixelated'
            }} src={imageSrc}></img>
            <span className='text-white fw-bold'
                style={{ fontSize: CELL_SIZE / 1.5 }}>{text}</span>
        </div>
    );
}

export default InfoDisplayItem;
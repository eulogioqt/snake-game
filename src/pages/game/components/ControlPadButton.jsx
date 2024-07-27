import React from 'react';
import { useApp } from '../../app/AppContext';

const ControlPadButton = ({ text, onClick }) => {
    const { CELL_SIZE } = useApp();

    return (
        <button
            className="btn"
            onMouseDown={onClick}
            style={{
                height: CELL_SIZE * 4,
                width: CELL_SIZE * 4,
                fontSize: CELL_SIZE * 2,
                border: CELL_SIZE / 5 + "px solid #174209",
                fontWeight: "bold",
                backgroundColor: "#28530A",
                color: "white"
            }}
        >
            {text}
        </button>
    );
}

export default ControlPadButton;

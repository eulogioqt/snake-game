import React from 'react';

import { useApp } from '../../app/AppContext';
import { useSettings } from '../../menu/context/SettingsContext';

import { backgroundStyles } from '../../menu/context/SettingsContext';

const ControlPadButton = ({ text, onClick }) => {
    const { CELL_SIZE } = useApp();
    const { backgroundStyleIndex } = useSettings();

    const backgroundStyle = backgroundStyles[backgroundStyleIndex];

    return (
        <button
            className="btn"
            onMouseDown={onClick}
            style={{
                height: CELL_SIZE * 4,
                width: CELL_SIZE * 4,
                fontSize: CELL_SIZE * 2,
                border: CELL_SIZE / 5 + "px solid " + backgroundStyle[5],
                fontWeight: "bold",
                backgroundColor: backgroundStyle[4],
                color: "white"
            }}
        >
            {text}
        </button>
    );
}

export default ControlPadButton;

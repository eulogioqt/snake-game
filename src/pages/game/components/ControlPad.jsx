import React from 'react';
import { useApp, useIsLarge } from '../../app/AppContext';
import { useSettings } from '../../menu/context/SettingsContext';

const ControlPad = ({ onKeyDown }) => {
    const { CELL_SIZE, WIDTH_CELLS, HEIGHT_CELLS } = useApp();
    const { AIMode } = useSettings();
    const isLarge = useIsLarge();
    const handleKeyDown = (keyCode) => onKeyDown(keyCode);

    const buttonStyle = {
        height: CELL_SIZE * 4,
        width: CELL_SIZE * 4,
        fontSize: CELL_SIZE * 2,
        border: CELL_SIZE / 5 + "px solid #174209",
        fontWeight: "bold",
        backgroundColor: "#28530A",
        color: "white"
    };

    // No queremos que se muestre ni en ordenador ni en el modo IA / automatico
    return (
        <div className="flex-column justify-content-center align-items-center" style={{
            display: isLarge || AIMode ? "none" : "flex",
            width: (WIDTH_CELLS + 2) * CELL_SIZE, height: (9) * CELL_SIZE, backgroundColor: "#4A752C"
        }}>
            <div className='d-flex justify-content-center'>
                <button
                    className="btn"
                    style={buttonStyle}
                    onMouseDown={() => handleKeyDown(38)}
                >
                    &#8593;
                </button>
            </div>
            <div className='mt-2'>
                <button
                    className="btn"
                    style={buttonStyle}
                    onMouseDown={() => handleKeyDown(37)}
                >
                    &#8592;
                </button>
                <button
                    className="btn mx-2"
                    style={buttonStyle}
                    onMouseDown={() => handleKeyDown(40)}
                >
                    &#8595;
                </button>
                <button
                    className="btn"
                    style={buttonStyle}
                    onMouseDown={() => handleKeyDown(39)}
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
}

export default ControlPad;

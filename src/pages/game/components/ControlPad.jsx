import React from 'react';
import { useIsLarge } from '../../app/AppContext';
import { useSettings } from '../../menu/context/SettingsContext';

const ControlPad = ({ onKeyDown }) => {
    const { AIMode } = useSettings();
    const isLarge = useIsLarge();
    const handleKeyDown = (keyCode) => onKeyDown(keyCode);

    const buttonStyle = {
        height: "75px",
        width: "75px",
        fontSize: "1.5rem",
    };

    // No queremos que se muestre ni en ordenador ni en el modo IA / automatico
    return (
        <div className="flex-column align-items-center" style={{ display: isLarge || AIMode ? "none" : "flex" }}>
            <div className='d-flex justify-content-center'>
                <button
                    className="btn btn-secondary"
                    style={buttonStyle}
                    onMouseDown={() => handleKeyDown(38)}
                >
                    &#8593;
                </button>
            </div>
            <div className='mt-2'>
                <button
                    className="btn btn-secondary"
                    style={buttonStyle}
                    onMouseDown={() => handleKeyDown(37)}
                >
                    &#8592;
                </button>
                <button
                    className="btn btn-secondary mx-2"
                    style={buttonStyle}
                    onMouseDown={() => handleKeyDown(40)}
                >
                    &#8595;
                </button>
                <button
                    className="btn btn-secondary"
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

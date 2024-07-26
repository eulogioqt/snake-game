import React from 'react';
import { useApp, useIsLarge } from '../../app/AppContext';
import { useSettings } from '../../menu/context/SettingsContext';
import ControlPadButton from './ControlPadButton';

const ControlPad = ({ onKeyDown }) => {
    const { CELL_SIZE, WIDTH_CELLS, HEIGHT_CELLS } = useApp();
    const { AIMode } = useSettings();
    const isLarge = useIsLarge();

    const handleKeyDown = (keyCode) => onKeyDown(keyCode);

    // No queremos que se muestre ni en ordenador ni en el modo IA / automatico
    return (
        <div className="flex-column justify-content-center align-items-center" style={{
            display: isLarge || AIMode ? "none" : "flex",
            width: (WIDTH_CELLS + 2) * CELL_SIZE, height: (9) * CELL_SIZE, backgroundColor: "#4A752C"
        }}>
            <div className='d-flex justify-content-center'>
                <ControlPadButton text={"▲"} onClick={() => handleKeyDown(38)} />
            </div>
            <div className='d-flex mt-2'>
                <ControlPadButton text={"◄"} onClick={() => handleKeyDown(37)} />
                <div className='mx-2'>
                    <ControlPadButton text={"▼"} onClick={() => handleKeyDown(40)} />
                </div>
                <ControlPadButton text={"►"} onClick={() => handleKeyDown(39)} />
            </div>
        </div>
    );
}

export default ControlPad;

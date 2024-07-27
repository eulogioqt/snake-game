import React from 'react';

import ControlPadButton from './ControlPadButton';

import { useApp } from '../../app/AppContext';

const ControlPad = ({ onKeyDown }) => {
    const { DISPLAY_PAD, CELL_SIZE, WIDTH_CELLS } = useApp();

    const handleKeyDown = (keyCode) => onKeyDown(keyCode);

    return (
        <div className="flex-column justify-content-center align-items-center"
            style={{
                display: DISPLAY_PAD ? "none" : "flex",
                width: (WIDTH_CELLS + 2) * CELL_SIZE,
                height: (9) * CELL_SIZE,
                backgroundColor: "#4A752C"
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

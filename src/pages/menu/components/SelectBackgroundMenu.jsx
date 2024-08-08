import React from 'react';

import { backgronudThumbnails, useSettings } from '../context/SettingsContext';

import SelectDisplayItem from './SelectDisplayItem';

const SelectBackgroundMenu = ({ selectBackgroundOpen, closeMenu }) => {
    const { backgroundStyleIndex, setBackgroundStyleIndex } = useSettings();

    const selectBackgroundRender = (
        <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 200 }}>
            <div className="card p-4" style={{ width: "80%", maxWidth: "600px" }}>
                <h2 className="text-center mb-4">Seleccionar fondo</h2>

                <div className="row">
                    {Object.keys(backgronudThumbnails).map((key) => {
                        const imageSrc = backgronudThumbnails[key];
                        const isSelected = backgroundStyleIndex === key;
                        const glowColor = key;
                        const onClick = () => setBackgroundStyleIndex(key);

                        return (
                            <div className="col-sm-4 col-12 mb-sm-5 my-5 d-flex justify-content-center align-items-center" key={key}>
                                <SelectDisplayItem width={80} height={80} scale={1.75}
                                    imageSrc={imageSrc} isSelected={isSelected} glowColor={glowColor} onClick={onClick} />
                            </div>
                        );
                    })}
                </div>

                <div className="text-end mt-4">
                    <button className="btn btn-secondary" onClick={closeMenu}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );

    return selectBackgroundOpen ? selectBackgroundRender : null;
}

export default SelectBackgroundMenu;

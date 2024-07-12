import React, { useState } from 'react';

import { useSettings } from '../context/SettingsContext';
import { useImages } from '../../../images/ImagesContext';

const SelectFoodMenu = ({ selectFoodOpen, closeMenu }) => {
    const { foodIndex, setFoodIndex } = useSettings();
    const { foodImages, foodColor } = useImages();

    const selectFoodMenuRender = (
        <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 200 }}>
            <div className="card p-4" style={{ width: "80%", maxWidth: "600px" }}>
                <h2 className="text-center mb-4">Seleccionar comida</h2>

                <div className="row">
                    {foodImages && Object.keys(foodImages).map((key) => {
                        const isSelected = foodIndex === key;

                        return (
                            <div className="col-sm-3 col-6 mb-sm-4 my-4 d-flex justify-content-center align-items-center" key={key}>
                                <img
                                    src={foodImages[key].src}
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        imageRendering: "pixelated",
                                        cursor: "pointer",
                                        transform: isSelected ? "scale(2)" : "scale(1)",
                                        filter: isSelected ? "drop-shadow(0 0 10px " + foodColor[key] + ")" : "none",
                                        transition: "transform 0.25s, filter 0.25s"
                                    }}
                                    onClick={() => setFoodIndex(key)}
                                />
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

    return selectFoodOpen ? selectFoodMenuRender : null;
}

export default SelectFoodMenu;

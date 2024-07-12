import React, { useState } from 'react';

import { useSettings } from '../context/SettingsContext';
import { useFoodImages } from '../../game/components/Images';

const SelectFoodMenu = ({ selectFoodOpen, closeMenu }) => {
    const { foodIndex, setFoodIndex } = useSettings();
    const foodImages = useFoodImages();

    const getAverageColor = (imageObj) => {
        const canvas = document.createElement('canvas');
        canvas.width = imageObj.width;
        canvas.height = imageObj.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(imageObj, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let [r, g, b, n] = [0, 0, 0, 0];
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] > 10) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                n++;
            }
        }

        const [R, G, B] = [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
        const decToHex = (dec) => {
            let hex = dec.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return "#" + decToHex(R) + decToHex(G) + decToHex(B);;
    };

    const selectFoodMenuRender = (
        <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 200 }}>
            <div className="card p-4" style={{ width: "80%", maxWidth: "600px" }}>
                <h2 className="text-center mb-4">Seleccionar comida</h2>

                <div className="row">
                    {foodImages && Object.keys(foodImages).map((key, index) => {
                        const isSelected = foodIndex === key;
                        const color = getAverageColor(foodImages[key]);

                        return (
                            <div className="col-sm-3 col-6 my-sm-0 my-3 d-flex justify-content-center align-items-center" key={key}>
                                <img
                                    src={foodImages[key].src}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        imageRendering: "pixelated",
                                        cursor: "pointer",
                                        transform: isSelected ? "scale(1.5)" : "scale(1)",
                                        filter: isSelected ? "drop-shadow(0 0 10px " + color + ")" : "none",
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

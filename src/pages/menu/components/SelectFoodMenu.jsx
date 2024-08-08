import React from 'react';

import { useSettings } from '../context/SettingsContext';
import { useImages } from '../../../images/ImagesContext';

import randomFoodSrc from '/src/assets/randomFood.png';
import SelectDisplayItem from './SelectDisplayItem';

const SelectFoodMenu = ({ selectFoodOpen, closeMenu }) => {
    const { foodIndex, setFoodIndex } = useSettings();
    const { foodImages, foodColor } = useImages();

    const selectFoodMenuRender = (
        <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 200 }}>
            <div className="card p-4" style={{ width: "80%", maxWidth: "600px" }}>
                <h2 className="text-center mb-4">Seleccionar comida</h2>

                <div className="row">
                    {Object.keys(foodImages).map((key) => {
                        const imageSrc = foodImages[key].src;
                        const isSelected = foodIndex === key;
                        const glowColor = foodColor[key];
                        const onClick = () => setFoodIndex(key);

                        return (
                            <div className="col-sm-3 col-6 mb-sm-4 my-4 d-flex justify-content-center align-items-center" key={key}>
                                <SelectDisplayItem imageSrc={imageSrc} isSelected={isSelected} glowColor={glowColor} onClick={onClick} />
                            </div>
                        );
                    })}
                    <div className='col-12 d-flex justify-content-center align-items-center my-3'>
                        <SelectDisplayItem
                            imageSrc={randomFoodSrc}
                            isSelected={foodIndex === "random"}
                            glowColor={"yellow"}
                            onClick={() => setFoodIndex("random")} />
                    </div>
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

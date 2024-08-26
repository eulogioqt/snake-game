import React, { useState } from 'react';

import { Palette, Gear, HeartFill, Apple, Clock, Back } from 'react-bootstrap-icons';

import { useSettings, backgronudThumbnails } from '../../../contexts/SettingsContext';
import { useImages } from '../../../contexts/ImagesContext';
import { useApp } from '../../../contexts/AppContext';

import randomFoodSrc from '/src/assets/images/food/randomFood.png';

import SelectFoodMenu from './SelectFoodMenu';
import SelectBackgroundMenu from './SelectBackgroundMenu';
import SettingDisplay from './SettingDisplay';

const SettingsMenu = ({ settingsOpen, closeSettings }) => {
    const {
        foodIndex,
        foodAmount, setFoodAmount,
        backgroundStyleIndex,
        tickTime, setTickTime,
        snakeColor, setSnakeColor,
        inmortalMode, setInmortalMode,
        AIMode, setAIMode
    } = useSettings();
    const { WIDTH_CELLS, HEIGHT_CELLS } = useApp();
    const { foodImages } = useImages();

    const [selectFoodOpen, setSelectFoodOpen] = useState(false);
    const swapSelectFood = () => setSelectFoodOpen(value => !value);
    const [selectBackgroundOpen, setSelectBackgroundOpen] = useState(false);
    const swapSelectBackground = () => setSelectBackgroundOpen(value => !value);

    const handleFoodAmountInputChange = (e) => {
        const value = e.target.value;

        if (value.length <= 4)
            setFoodAmount(value);
    };

    const handleFoodAmountInputBlur = () => {
        let actualValue = parseInt(foodAmount, 10);

        if (isNaN(actualValue) || actualValue < 1) {
            actualValue = 1;
        } else if (actualValue > WIDTH_CELLS * HEIGHT_CELLS) {
            actualValue = WIDTH_CELLS * HEIGHT_CELLS;
        }

        setFoodAmount(actualValue);
    };

    const handleTickTimeInputChange = (e) => {
        const value = e.target.value;

        if (value.length <= 4)
            setTickTime(value);
    };

    const handleTickTimeInputBlur = () => {
        let actualValue = parseInt(tickTime, 10);

        if (isNaN(actualValue) || actualValue < 1) {
            actualValue = 1;
        } else if (actualValue > 1000) {
            actualValue = 1000;
        }

        setTickTime(actualValue);
    };

    const foodSrc = foodIndex === "random" ? randomFoodSrc : foodImages[foodIndex].src;

    const settingsMenuRender = (
        <>
            <SelectFoodMenu selectFoodOpen={selectFoodOpen} closeMenu={swapSelectFood} />
            <SelectBackgroundMenu selectBackgroundOpen={selectBackgroundOpen} closeMenu={swapSelectBackground} />

            <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100 scroll'
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 100 }}>
                <div className="card p-4" style={{ width: "80%", maxWidth: "600px", maxHeight: "90%", overflowY: "auto", overflowX: "hidden" }}>
                    <h2 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>Ajustes</h2>

                    {/* Opción para seleccionar la comida */}
                    <SettingDisplay
                        setting={
                            <div className='d-flex align-items-center'>
                                <Gear size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Seleccionar comida</h5>
                            </div>
                        }

                        input={
                            foodImages && <img src={foodSrc}
                                style={{ width: "40px", height: "40px", imageRendering: "pixelated", cursor: "pointer" }}
                                onClick={swapSelectFood} />
                        }
                    />

                    {/* Opción para seleccionar la comida */}
                    <SettingDisplay
                        setting={
                            <div className='d-flex align-items-center'>
                                <Back size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Seleccionar fondo</h5>
                            </div>
                        }

                        input={
                            <img src={backgronudThumbnails[backgroundStyleIndex]}
                                style={{ width: "40px", height: "40px", imageRendering: "pixelated", cursor: "pointer" }}
                                onClick={swapSelectBackground} />
                        }
                    />


                    {/* Selección de color para la serpiente */}
                    <SettingDisplay
                        setting={
                            <div className='d-flex align-items-center'>
                                <Palette size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Color de la serpiente</h5>
                            </div>
                        }

                        input={
                            <div className='d-flex align-items-center justify-content-between'>
                                <input
                                    type="color"
                                    id="snakeColor"
                                    className="form-control form-control-color"
                                    value={snakeColor}
                                    onChange={(event) => setSnakeColor(event.target.value)}
                                />
                            </div>
                        }
                    />


                    {/* Opción para establecer la cantidad de comida */}
                    <SettingDisplay
                        setting={
                            <div className='d-flex align-items-center'>
                                <Apple size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Cantidad de comida</h5>
                            </div>
                        }

                        input={
                            <div className="form-check form-switch ps-0">
                                <input
                                    className="form-control"
                                    type="number"
                                    value={foodAmount}
                                    onChange={handleFoodAmountInputChange}
                                    onBlur={handleFoodAmountInputBlur}
                                    min="1"
                                    max={WIDTH_CELLS * HEIGHT_CELLS}
                                    style={{ width: "80px" }}
                                />
                            </div>
                        }
                    />

                    {/* Opción para establecer el tiempo por tick */}
                    <SettingDisplay
                        setting={
                            <div className='d-flex align-items-center'>
                                <Clock size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0'>Tiempo de tick (ms)</h5>
                            </div>
                        }

                        input={
                            <div className="form-check form-switch ps-0">
                                <input
                                    className="form-control"
                                    type="number"
                                    value={tickTime}
                                    onChange={handleTickTimeInputChange}
                                    onBlur={handleTickTimeInputBlur}
                                    min="1"
                                    max="1000"
                                    style={{ width: "80px" }}
                                />
                            </div>
                        }
                    />

                    {/* Opción para activar/desactivar el modo inteligencia artificial */}
                    <SettingDisplay
                        setting={
                            <div className='d-flex align-items-center'>
                                <Gear size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Modo inteligencia artificial</h5>
                            </div>
                        }

                        input={
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={AIMode}
                                    onChange={() => setAIMode(AIMode => !AIMode)}
                                    style={{ width: "40px", height: "25px" }}
                                />
                            </div>
                        }
                    />

                    {/* Opción para activar/desactivar el modo inmortal */}
                    <SettingDisplay
                        setting={
                            <div className='d-flex align-items-center'>
                                <HeartFill size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Modo inmortal</h5>
                            </div>
                        }

                        input={
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={inmortalMode}
                                    onChange={() => setInmortalMode(inmortalMode => !inmortalMode)}
                                    style={{ width: "40px", height: "25px" }}
                                />
                            </div>
                        }
                    />

                    {/* Botón para cerrar el menú de ajustes */}
                    <div className="text-end">
                        <button className="btn btn-secondary" onClick={closeSettings}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

    return settingsOpen ? settingsMenuRender : null;
}

export default SettingsMenu;

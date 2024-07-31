import React, { useState } from 'react';

import { Palette, Palette2, Gear, HeartFill, Apple, Clock } from 'react-bootstrap-icons';

import { useSettings, backgroundStyles } from '../context/SettingsContext';
import { useImages } from '../../../images/ImagesContext';
import { useApp } from '../../app/AppContext';

import randomFoodSrc from '/src/assets/randomFood.png';
import SelectFoodMenu from './SelectFoodMenu';

const SettingsMenu = ({ settingsOpen, closeSettings }) => {
    const {
        foodIndex, foodAmount, setFoodAmount,
        backgroundStyle, setBackgroundStyle,
        tickTime, setTickTime,
        snakeColor, setSnakeColor,
        inmortalMode, setInmortalMode,
        AIMode, setAIMode
    } = useSettings();
    const { WIDTH_CELLS, HEIGHT_CELLS } = useApp();
    const { foodImages } = useImages();

    const [selectFoodOpen, setSelectFoodOpen] = useState(false);
    const swapSelectFood = () => setSelectFoodOpen(value => !value);

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

            <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 100 }}>
                <div className="card p-4" style={{ width: "80%", maxWidth: "600px" }}>
                    <h2 className="text-center mb-4">Configuración</h2>

                    {/* Opción para seleccionar la comida */}
                    <div className="mb-4">
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <Gear size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Seleccionar comida</h5>
                            </div>
                            {foodImages && <img src={foodSrc}
                                style={{ width: "40px", height: "40px", imageRendering: "pixelated", cursor: "pointer" }}
                                onClick={swapSelectFood} />}
                        </div>
                    </div>

                    {/* Opción para seleccionar el estilo del fondo */}
                    <div className="mb-4">
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <Palette2 size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Estilo del fondo</h5>
                            </div>
                            <div className="btn-group" role="group">
                                <button
                                    type="button"
                                    className={`btn btn-${backgroundStyle === backgroundStyles.green ? 'success' : 'outline-success'}`}
                                    onClick={() => setBackgroundStyle(backgroundStyles.green)}
                                >
                                    Verde
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-${backgroundStyle === backgroundStyles.blue ? 'primary' : 'outline-primary'}`}
                                    onClick={() => setBackgroundStyle(backgroundStyles.blue)}
                                >
                                    Azul
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-${backgroundStyle === backgroundStyles.red ? 'danger' : 'outline-danger'}`}
                                    onClick={() => setBackgroundStyle(backgroundStyles.red)}
                                >
                                    Rojo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Selección de color para la serpiente */}
                    <div className="mb-4">
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <Palette size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Color de la serpiente</h5>
                            </div>
                            <input
                                type="color"
                                id="snakeColor"
                                className="form-control form-control-color"
                                value={snakeColor}
                                onChange={(event) => setSnakeColor(event.target.value)}
                            />
                        </div>
                    </div>

                    {/* Opción para establecer la cantidad de comida */}
                    <div className="mb-4">
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <Apple size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Cantidad de comida</h5>
                            </div>
                            <div className="form-check form-switch">
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
                        </div>
                    </div>

                    {/* Opción para establecer el tiempo por tick */}
                    <div className="mb-4">
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <Clock size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Tiempo de tick (ms)</h5>
                            </div>
                            <div className="form-check form-switch">
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
                        </div>
                    </div>

                    {/* Opción para activar/desactivar el modo inteligencia artificial */}
                    <div className="mb-4">
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <Gear size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Modo inteligencia artificial</h5>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={AIMode}
                                    onChange={() => setAIMode(AIMode => !AIMode)}
                                    style={{ width: "40px", height: "25px" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Opción para activar/desactivar el modo inmortal */}
                    <div className="mb-4">
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <HeartFill size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Modo inmortal</h5>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={inmortalMode}
                                    onChange={() => setInmortalMode(inmortalMode => !inmortalMode)}
                                    style={{ width: "40px", height: "25px" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botón para cerrar el menú de ajustes */}
                    <div className="text-end mt-4">
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

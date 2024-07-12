import React, { useState } from 'react';
import { GearFill, Palette, Gear, HeartFill } from 'react-bootstrap-icons'; // Utilizando iconos de Bootstrap
import { useSettings } from '../context/SettingsContext';
import SelectFoodMenu from './SelectFoodMenu';
import { useImages } from '../../../images/ImagesContext';

const SettingsMenu = ({ settingsOpen, closeSettings }) => {
    const { foodIndex, rack, setRack, snakeColor, setSnakeColor, inmortalMode, setInmortalMode } = useSettings();
    const { foodImages } = useImages();

    const [selectFoodOpen, setSelectFoodOpen] = useState(false);
    const swapSelectFood = () => setSelectFoodOpen(value => !value);

    const settingsMenuRender = (
        <>
            <SelectFoodMenu selectFoodOpen={selectFoodOpen} closeMenu={swapSelectFood} />

            <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 100 }}>
                <div className="card p-4" style={{ width: "80%", maxWidth: "600px" }}>
                    <h2 className="text-center mb-4">Configuración</h2>

                    {/* Opción para activar/desactivar la cuadricula */}
                    <div className="mb-4">
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <Gear size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Seleccionar comida</h5>
                            </div>
                            {foodImages && <img src={foodImages[foodIndex].src}
                                style={{ width: "40px", height: "40px", imageRendering: "pixelated", cursor: "pointer" }}
                                onClick={swapSelectFood} />}
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

                    {/* Opción para activar/desactivar la cuadricula */}
                    <div className="mb-4">
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <GearFill size={30} className="me-3 flex-shrink-0" />
                                <h5 className='mb-0 me-3'>Mostrar cuadrícula</h5>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={rack}
                                    onChange={() => setRack(showRack => !showRack)}
                                    style={{ width: "40px", height: "25px" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Opción para activar/desactivar el modo inteligencia artificial *
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
                                onChange={() => setAIMode(AIMode => !AIMode);}
                                style={{ width: "40px", height: "25px" }}
                            />
                        </div>
                    </div>
                </div>*/}

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

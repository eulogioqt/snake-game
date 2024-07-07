import React, { useState } from 'react';
import { GearFill, Palette, Gear, HeartFill } from 'react-bootstrap-icons'; // Utilizando iconos de Bootstrap
import { useSettings } from '../context/SettingsContext';

const SettingsMenu = ({ settingsOpen, closeSettings }) => {
    const { rack, setRack, snakeColor, setSnakeColor, AIMode, setAIMode, inmortalMode, setInmortalMode } = useSettings();

    const [showRack, setShowRack] = useState(rack);
    const [showAIMode, setShowAIMode] = useState(AIMode);
    const [showInmortalMode, setShowInmortalMode] = useState(inmortalMode);

    const handleRackChange = () => {
        setRack(!showRack);
        setShowRack(!showRack);
    };

    const handleColorChange = (event) => {
        setSnakeColor(event.target.value);
    };

    const handleAIModeChange = () => {
        setAIMode(!showAIMode);
        setShowAIMode(!showAIMode);
    };

    const handleInmortalModeChange = () => {
        setInmortalMode(!showInmortalMode);
        setShowInmortalMode(!showInmortalMode);
    };

    const settingsMenuRender = (
        <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999 }}>
            <div className="card p-4" style={{ width: "80%", maxWidth: "600px" }}>
                <h2 className="text-center mb-4">Configuración</h2>

                {/* Opción para activar/desactivar la rejilla */}
                <div className="mb-4">
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <GearFill size={30} className="me-3 flex-shrink-0" />
                            <h5 className='mb-0 me-3'>Mostrar rejilla</h5>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={showRack}
                                onChange={handleRackChange}
                                style={{ width: "40px", height: "25px" }}
                            />
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
                            onChange={handleColorChange}
                        />
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
                                checked={showAIMode}
                                onChange={handleAIModeChange}
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
                                checked={showInmortalMode}
                                onChange={handleInmortalModeChange}
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
    );

    return settingsOpen ? settingsMenuRender : null;
}

export default SettingsMenu;

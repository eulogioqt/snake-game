import React, { useState } from "react";
import { Play, Gear, ArrowUpRight } from 'react-bootstrap-icons';
import { useApp } from "../../contexts/AppContext";
import { useIsLarge } from "../../hooks/useIsLarge";
import SettingsMenu from "./components/SettingsMenu";

const MenuPage = () => {
    const { handlePageIndex } = useApp();
    const isLarge = useIsLarge();

    const [settingsOpen, setSettingsOpen] = useState(false);

    const goToGame = () => handlePageIndex(1);
    const swapSettingsOpen = () => setSettingsOpen(settings => !settings);

    const ResponsiveButton = ({ icon: Icon, text, onClick, color }) => (
        <button className={`btn ${color} mb-2 d-flex align-items-center justify-content-start`}
            style={{ fontSize: "2rem", width: isLarge ? "400px" : "250px", padding: "10px" }}
            onClick={onClick}>
            <Icon style={{ width: "50px", height: "50px" }} />
            <span className="flex-grow-1 text-center me-4">
                {text}
            </span>
        </button>
    );

    return (
        <>
            <SettingsMenu settingsOpen={settingsOpen} closeSettings={swapSettingsOpen} />

            <div className="d-flex flex-column align-items-center justify-content-center w-100 vh-100">
                <span className="mb-5 text-center" style={{ fontSize: isLarge ? "5rem" : "3rem" }}>
                    Snake Game
                </span>

                <ResponsiveButton text="Jugar" onClick={goToGame} icon={Play} color="btn-primary" />
                <ResponsiveButton text="Ajustes" onClick={swapSettingsOpen} icon={Gear} color="btn-secondary" />
            </div>

            {/* Marca de agua con posicionamiento responsivo */}
            <div className={`position-fixed bottom-0 ${isLarge ? 'end-0' : 'start-50 translate-middle-x'} p-2`} style={{ zIndex: 1000 }}>
                <a href="https://eulogioqt.github.io" target="_blank"
                    style={{
                        textDecoration: "none",
                        color: "gray",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        opacity: 0.8,
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "opacity 0.3s, transform 0.3s"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = 1;
                        e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = 0.8;
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                >
                    <div className="d-flex flex-column align-items-center">
                        <span>Project by</span>
                        <div className="d-flex justify-content-center align-items-center">
                            <img src="https://www.github.com/eulogioqt.png"
                                style={{ width: 25, height: 25, marginRight: 4 }} />
                            <span style={{ color: "black", margin: 0 }}>Eulogio Quemada</span>
                        </div>
                    </div>
                </a>
            </div>
        </>
    );
}

export default MenuPage;

import React, { useState } from "react";

import { Play, Gear } from 'react-bootstrap-icons';

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

                <ResponsiveButton
                    text="Jugar"
                    onClick={goToGame}
                    icon={Play}
                    color="btn-primary"
                />
                <ResponsiveButton
                    text="Ajustes"
                    onClick={swapSettingsOpen}
                    icon={Gear}
                    color="btn-secondary"
                />
            </div>
        </>
    );
}

export default MenuPage;

import React, { useState } from "react";
import { Play, Gear } from 'react-bootstrap-icons';
import { useApp, useIsLarge } from "../app/AppContext";
import SettingsMenu from "./components/SettingsMenu";

const MenuPage = () => {
    const { handlePageIndex } = useApp();
    const isLarge = useIsLarge();

    const [settingsOpen, setSettingsOpen] = useState(false);

    const goToGame = () => handlePageIndex(1);
    const swapSettingsOpen = () => setSettingsOpen(settings => !settings);

    return (
        <>
            <SettingsMenu settingsOpen={settingsOpen} closeSettings={swapSettingsOpen} />

            <div className="d-flex flex-column align-items-center justify-content-center w-100 vh-100">
                <span className="mb-5 text-center" style={{ fontSize: isLarge ? "5rem" : "3rem" }}>
                    Snake Game
                </span>
                <button className="btn btn-primary mb-2 d-flex align-items-center justify-content-start"
                    style={{ fontSize: "2rem", width: isLarge ? "400px" : "250px", padding: "10px" }}
                    onClick={goToGame}>
                    <Play style={{ width: "50px", height: "50px" }} />
                    <span className="flex-grow-1 text-center me-4">
                        Jugar
                    </span>
                </button>
                <button className="btn btn-secondary d-flex align-items-center justify-content-start"
                    style={{ fontSize: "2rem", width: isLarge ? "400px" : "250px", padding: "10px" }}
                    onClick={swapSettingsOpen}          >
                    <Gear style={{ margin: "7px" }} />
                    <span className="flex-grow-1 text-center me-4">
                        Ajustes
                    </span>
                </button>
            </div>
        </>
    );
}

export default MenuPage;

import React from "react";

import { useApp } from "../app/AppContext";

const MenuPage = () => {
    const { handlePageIndex } = useApp();

    const goToGame = () => handlePageIndex(1);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100 vh-100">
            <button className="btn btn-primary" style={{ fontSize: "2rem" }}
                onClick={goToGame} onKeyPress={goToGame}>
                Empezar partida
            </button>
        </div>
    );
}

export default MenuPage;
import React from 'react';

import { useApp, useIsLarge } from '../../app/AppContext';

const GameWin = ({ gameStatus, playAgain, score, time }) => {
    const { handlePageIndex } = useApp();
    const isLarge = useIsLarge();

    const goToMenu = () => handlePageIndex(0);

    const gameWinRender = (
        <div className='d-flex flex-column align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999 }}>
            <div className="text-center mx-3 d-flex flex-column">
                <span className="text-white"
                    style={{ fontSize: isLarge ? "4rem" : "2.3rem", textShadow: "2px 2px 4px #000000" }}>
                    ¡Has ganado!</span>
                <span className="text-white"
                    style={{ fontSize: isLarge ? "2.5rem" : "1.25rem" }}>
                    Has completado el juego con {score} punto{score === 1 ? "" : "s"} en {time}.</span>
                <div className={`col mt-3 ${isLarge ? "" : "d-flex flex-column"}`}>
                    <button className={`btn btn-primary m${isLarge ? "e" : "b"}-2`}
                        style={{ fontSize: isLarge ? "1.5rem" : "1rem" }}
                        onClick={playAgain} onKeyPress={playAgain}>
                        Volver a Jugar
                    </button>
                    <button className="btn btn-secondary"
                        style={{ fontSize: isLarge ? "1.5rem" : "1rem" }}
                        onClick={goToMenu} onKeyPress={goToMenu}>
                        Volver al menú
                    </button>
                </div>
            </div>
        </div>
    );

    return gameStatus == 3 ? gameWinRender : null;
}

export default GameWin;

import React, { useEffect } from 'react';

const GameOver = ({ gameOver, playAgain, score }) => {
    const handleRetry = (event) => {
        if (event.key === "Enter")
            playAgain();
    }

    useEffect(() => {
        if (gameOver) {
            document.addEventListener('keydown', handleRetry);
            return () => document.removeEventListener('keydown', handleRetry);
        }
    }, [gameOver]);

    const isLarge = window.innerWidth >= 576;
    const gameOverRender = (
        <div className='d-flex flex-column align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999 }}>
            <div className="text-center mx-3 d-flex flex-column">
                <span className="text-white" style={{ fontSize: isLarge ? "4rem" : "2.3rem", textShadow: "2px 2px 4px #000000" }}>
                    ¡Has perdido!</span>
                <span className="text-white" style={{ fontSize: isLarge ? "2.5rem" : "1.25rem" }}>
                    Has conseguido {score} punto{score === 1 ? "" : "s"} en esta partida.</span>
                <div className="col mt-3">
                    <button className="btn btn-primary" style={{ fontSize: isLarge ? "1.5rem" : "1rem" }} onClick={playAgain}>
                        Volver a Jugar
                    </button>
                </div>
            </div>
        </div>
    );

    return gameOver ? gameOverRender : null;
}

export default GameOver;

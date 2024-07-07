import React, { useEffect } from 'react';

const largeScreenStyles = {
    fontSize: "4rem",
    buttonFontSize: "1.5rem",
    subTitleFontSize: "2.5rem"
};

const smallScreenStyles = {
    fontSize: "2.3rem",
    buttonFontSize: "1rem",
    subTitleFontSize: "1.25rem"
};

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

    const styles = window.innerWidth >= 576 ? largeScreenStyles : smallScreenStyles;
    const gameOverRender = (
        <div className='d-flex flex-column align-items-center justify-content-center position-fixed w-100 h-100'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999 }}>
            <div className="text-center mx-3 d-flex flex-column">
                <span className="text-white" style={{ fontSize: styles.fontSize, textShadow: "2px 2px 4px #000000" }}>
                    ¡Has perdido!</span>
                <span className="text-white" style={{ fontSize: styles.subTitleFontSize }}>
                    Has conseguido {score} punto{score === 1 ? "" : "s"} en esta partida.</span>
                <div className="col mt-3">
                    <button className="btn btn-primary" style={{ fontSize: styles.buttonFontSize }} onClick={playAgain}>
                        Volver a Jugar
                    </button>
                </div>
            </div>
        </div>
    );

    return gameOver ? gameOverRender : null;
}

export default GameOver;

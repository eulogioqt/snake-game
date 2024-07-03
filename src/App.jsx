import React, { useEffect, useRef, useState } from 'react';
import GameArea from './GameArea';
import "./App.css";

const SPEED = 100;
const DIRECTIONS = {
    38: [0, -1], // up
    40: [0, 1], // down
    37: [-1, 0], // left
    39: [1, 0] // right
};

const CONSTANTS = {
    WIDTH: 800,
    HEIGHT: 600,
    CELL_SIZE: 20
}

const APPLE_START = { x: 2, y: 0 };

const App = () => {
    const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
    const [apple, setApple] = useState(APPLE_START);
    const [score, setScore] = useState(0);
    const [dir, setDir] = useState([0, 0]);

    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const generateApple = () => setApple({
        x: getRandomInt(CONSTANTS.WIDTH / CONSTANTS.CELL_SIZE),
        y: getRandomInt(CONSTANTS.HEIGHT / CONSTANTS.CELL_SIZE)
    });
    const appleCollision = () => apple !== undefined && snake[0].x === apple.x && snake[0].y === apple.y;

    useEffect(() => {
        const handleDir = (keyCode) => {
            const newDir = DIRECTIONS[keyCode];
            if (newDir !== undefined) {
                setDir(actualDir => {
                    const validMove = actualDir[0] !== -newDir[0] || actualDir[1] !== -newDir[1];

                    return validMove ? newDir : actualDir;
                });
            }
        }
        const handleKeyDown = (event) => handleDir(event.keyCode);

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const moveSnake = () => {
            if (appleCollision()) {
                generateApple();
                setScore(prevScore => prevScore + 1);
            }

            setSnake(prevSnake =>
                [{ x: prevSnake[0].x + dir[0], y: prevSnake[0].y + dir[1] }]);
        };

        const interval = setInterval(moveSnake, SPEED);
        return () => clearInterval(interval);
    }, [snake, apple, dir, SPEED]);

    return (
        <div>
            <h1>Snake Game</h1>
            <h2>Score: {score}</h2>
            <GameArea snake={snake} apple={apple} CONSTANTS={CONSTANTS} />
        </div>
    );
};

export default App;

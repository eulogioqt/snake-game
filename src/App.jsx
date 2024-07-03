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

const APPLE_START = { x: 5, y: 1 };
const WIDTH_CELLS = CONSTANTS.WIDTH / CONSTANTS.CELL_SIZE;
const HEIGHT_CELLS = CONSTANTS.HEIGHT / CONSTANTS.CELL_SIZE;

const App = () => {
    const [timer, setTimer] = useState(0);

    const [snake, setSnake] = useState([{ x: 0, y: 0 }, { x: 1, y: 0 }]);
    const [apple, setApple] = useState(APPLE_START);
    const [score, setScore] = useState(0);
    const [dir, setDir] = useState([1, 0]);
    const [gameOver, setGameOver] = useState(false);

    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const generateApple = () => {
        let newApple;
        do {
            newApple = { x: getRandomInt(WIDTH_CELLS), y: getRandomInt(HEIGHT_CELLS) };
        } while (snake.some(segment => segment.x === newApple.x && segment.y === newApple.y));

        setApple(newApple);
    };

    const appleCollision = () => apple !== undefined && snake[0].x === apple.x && snake[0].y === apple.y;
    const bodyCollision = () => snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
    const wallCollision = () => snake[0].x < 0 || snake[0].y < 0 || snake[0].x >= WIDTH_CELLS || snake[0].y >= HEIGHT_CELLS;
    const checkCollision = () => bodyCollision() || wallCollision();

    useEffect(() => {
        const handleDir = (keyCode) => {
            const newDir = DIRECTIONS[keyCode];
            if (newDir && (snake[0].x + newDir[0] !== snake[1].x || snake[0].y + newDir[1] !== snake[1].y))
                setDir(newDir);
        }

        const handleKeyDown = (event) => handleDir(event.keyCode);
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [snake]);

    useEffect(() => {
        if (gameOver) return;

        const interval = setInterval(() => setTimer(timer => timer + 1), SPEED);
        return () => clearInterval(interval);
    }, [gameOver]);

    useEffect(() => {
        if (checkCollision()) setGameOver(true);
        else {
            const newSnake = [...snake];
            const head = { x: newSnake[0].x + dir[0], y: newSnake[0].y + dir[1] };

            newSnake.unshift(head);
            if (!appleCollision()) newSnake.pop();
            else {
                generateApple();
                setScore(prevScore => prevScore + 1);
            }

            setSnake(newSnake);
        }
    }, [timer]);

    return (
        <div>
            <h1>Snake Game</h1>
            <h2>Score: {score}</h2>
            <GameArea snake={snake} apple={apple} CONSTANTS={CONSTANTS} />
        </div>
    );
};

export default App;

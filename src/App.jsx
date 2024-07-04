import React, { useEffect, useRef, useState } from 'react';
import GameArea from './GameArea';
import ControlPad from './ControlPad';
import GameOver from './GameOver';

const SPEED = 100;
const DIRECTIONS = {
    38: [0, -1], // up
    40: [0, 1], // down
    37: [-1, 0], // left
    39: [1, 0] // right
};

const CONSTANTS = {
    WIDTH: Math.floor(window.innerWidth * 75 / 2000) * 20,
    HEIGHT: Math.floor(window.innerHeight * 50 / 2000) * 20,
    CELL_SIZE: 20
};

const WIDTH_CELLS = CONSTANTS.WIDTH / CONSTANTS.CELL_SIZE;
const HEIGHT_CELLS = CONSTANTS.HEIGHT / CONSTANTS.CELL_SIZE;

const APPLE_START = { x: 5, y: 1 };
const SNAKE_START = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
const DIR_START = [1, 0];

const App = () => {
    const [timer, setTimer] = useState(0);

    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [score, setScore] = useState(0);
    const [dir, setDir] = useState(DIR_START);
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
    const handleDir = (keyCode) => {
        const newDir = DIRECTIONS[keyCode];
        if (newDir && (snake[0].x + newDir[0] !== snake[1].x || snake[0].y + newDir[1] !== snake[1].y))
            setDir(newDir);
    }

    useEffect(() => {
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

    const playAgain = () => {
        setTimer(0);

        setSnake(SNAKE_START);
        setApple(APPLE_START);
        setScore(0);
        setDir(DIR_START);
        setGameOver(false);
    }

    return (
        <>
            <GameOver gameOver={gameOver} playAgain={playAgain} score={score} />

            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='text-center my-3'>
                    <h1>Snake Game</h1>
                    <h2>Score: {score}</h2>
                </div>
                <GameArea snake={snake} apple={apple} CONSTANTS={CONSTANTS} />
                <ControlPad onKeyDown={handleDir} />
            </div>
        </>
    );
};

export default App;

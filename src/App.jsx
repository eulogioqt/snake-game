import React, { useEffect, useState } from 'react';
import { SPEED, WIDTH, HEIGHT, CELL_SIZE, DIR_START, SNAKE_START, DIRECTIONS, APPLE_START } from './CONSTANTS.js';

import GameArea from './GameArea';
import ControlPad from './ControlPad';
import GameOver from './GameOver';

import './App.css';

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
            newApple = { x: getRandomInt(WIDTH / CELL_SIZE), y: getRandomInt(HEIGHT / CELL_SIZE) };
        } while (snake.some(segment => segment.x === newApple.x && segment.y === newApple.y));

        setApple(newApple);
    };

    const appleCollision = () => apple !== undefined && snake[0].x === apple.x && snake[0].y === apple.y;
    const bodyCollision = () => snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
    const wallCollision = () => snake[0].x < 0 || snake[0].y < 0 || snake[0].x >= WIDTH / CELL_SIZE || snake[0].y >= HEIGHT / CELL_SIZE;
    const checkCollision = () => bodyCollision() || wallCollision();
    const handleDir = (keyCode) => {
        const newDir = DIRECTIONS[keyCode];
        if (newDir && (snake[0].x + newDir[0] !== snake[1].x || snake[0].y + newDir[1] !== snake[1].y))
            setDir(newDir);
    }

    useEffect(() => {
        if (!gameOver) { // Siempre se cuenta un frame mas ya que se tiene que comprobar la colision despues de moverse no antes
            const interval = setInterval(() => setTimer(timer => timer + 1), SPEED);
            return () => clearInterval(interval);
        }
    }, [gameOver]);

    useEffect(() => {
        const handleKeyDown = (event) => handleDir(event.keyCode);
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [snake]);


    useEffect(() => {
        if (gameOver) return;

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
                    <h2>Score: {score} - Time: {(timer / (1000 / SPEED)).toFixed(2)}s</h2>
                </div>
                <GameArea snake={snake} apple={apple} />
                <ControlPad onKeyDown={handleDir} />
            </div>
        </>
    );
};

export default App;

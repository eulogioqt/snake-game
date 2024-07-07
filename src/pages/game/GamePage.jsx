import React, { useEffect, useState } from 'react';

import GameArea from './components/GameArea.jsx';
import ControlPad from './components/ControlPad.jsx';
import GameOver from './components/GameOver.jsx';

import { useApp } from '../app/AppContext.jsx';

const GamePage = () => {
    const { SPEED, WIDTH, HEIGHT, CELL_SIZE, DIR_START, SNAKE_START, DIRECTIONS, APPLE_START } = useApp();
    const [timer, setTimer] = useState(0);

    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [score, setScore] = useState(0);
    const [dir, setDir] = useState(DIR_START);
    const [gameStatus, setGameStatus] = useState(0); // 0 Not Started, 1 Started, 2 GameOver (3 Win)

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
        if (newDir && (snake[0].x + newDir[0] !== snake[1].x || snake[0].y + newDir[1] !== snake[1].y)) {
            setDir(newDir);
            if (gameStatus == 0) // Si el juego esta parado
                setGameStatus(1); // Inicio el juego
        }
    }

    useEffect(() => {
        if (gameStatus === 1) { // Siempre se cuenta un frame mas ya que se tiene que comprobar la colision despues de moverse no antes
            const interval = setInterval(() => setTimer(timer => timer + 1), SPEED);
            return () => clearInterval(interval);
        }
    }, [gameStatus]);

    useEffect(() => {
        const handleKeyDown = (event) => handleDir(event.keyCode);
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [snake]);

    useEffect(() => {
        if (gameStatus == 2) return;

        if (checkCollision()) setGameStatus(2);
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
        setGameStatus(0);
    }

    const time = (timer / (1000 / SPEED)).toFixed(2);
    return (
        <>
            <GameOver gameStatus={gameStatus} playAgain={playAgain} score={score} time={time} />

            <div className='d-flex flex-column align-items-center position-fixed w-100 h-100'>
                <div className='text-center my-3 monospace'>
                    <h1>Snake Game</h1>
                    <h2>Score: {score} Time: {time}s</h2>
                </div>
                <GameArea snake={snake} apple={apple} />
                <ControlPad onKeyDown={handleDir} />
            </div>
        </>
    );
};

export default GamePage;

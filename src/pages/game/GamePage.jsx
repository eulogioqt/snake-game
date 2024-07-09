import React, { useEffect, useState } from 'react';

import GameArea from './components/GameArea.jsx';
import ControlPad from './components/ControlPad.jsx';
import GameOver from './components/GameOver.jsx';

import { useApp, useIsLarge } from '../app/AppContext.jsx';
import { useSettings } from '../menu/context/SettingsContext.jsx';

const GamePage = () => {
    const { SPEED, WIDTH, HEIGHT, CELL_SIZE, DIR_START, SNAKE_START, DIRECTIONS, APPLE_START, handlePageIndex } = useApp();
    const { inmortalMode } = useSettings();
    const isLarge = useIsLarge();

    const [timer, setTimer] = useState(0);

    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [score, setScore] = useState(0);
    const [dir, setDir] = useState(DIR_START);
    const [gameStatus, setGameStatus] = useState(0); // 0 Not Started, 1 Started, 2 GameOver (3 Win)

    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const generateApple = (snake) => {
        let newApple;
        do {
            newApple = { x: getRandomInt(WIDTH / CELL_SIZE), y: getRandomInt(HEIGHT / CELL_SIZE) };
        } while (snake.some(segment => segment.x === newApple.x && segment.y === newApple.y));

        setApple(newApple);
    };

    const appleCollision = (snake) => apple !== undefined && snake[0].x === apple.x && snake[0].y === apple.y;
    const bodyCollision = (snake) => snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
    const wallCollision = (snake) => snake[0].x < 0 || snake[0].y < 0 || snake[0].x >= WIDTH / CELL_SIZE || snake[0].y >= HEIGHT / CELL_SIZE;
    const checkCollision = (snake) => bodyCollision(snake) || wallCollision(snake);
    const checkWin = (snake) => snake.length === (WIDTH / CELL_SIZE) * (HEIGHT / CELL_SIZE);
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

    useEffect(() => { // THIS METHOD EXECTES EACH TICK
        if (gameStatus == 1) { // Si el juego está en marcha
            const newSnake = [...snake];
            const head = { x: newSnake[0].x + dir[0], y: newSnake[0].y + dir[1] };
            newSnake.unshift(head); // Primero nos desplazamos
            newSnake.pop();

            const isCollision = checkCollision(newSnake);
            if (isCollision && !inmortalMode) setGameStatus(2); // Perdemos si hay colisión
            else if (checkWin(newSnake)) setGameStatus(3); // Ganamos si esta el tablero lleno
            else if (appleCollision(newSnake)) { // Crecemos si comemos manzana
                newSnake.push({}); // Añadimos parte del cuerpo

                generateApple(newSnake);
                setScore(prevScore => prevScore + 1);
            }

            if (!isCollision || !inmortalMode) // Quitar el or si no quiero que se salga al morir de la pantalla
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
                <div className='position-relative w-100 px-4 text-center'>
                    <div className='d-flex justify-content-center'>
                        <div className={`d-flex justify-content-${isLarge ? "end" : "center"}`} style={{ width: WIDTH }}>
                            <button className={`btn btn-danger mb-0 ${isLarge ? "position-absolute mt-5" : "mt-2"}`} onClick={() => handlePageIndex(0)}>
                                Salir
                            </button>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <h1 className='display-4'>Snake Game</h1>
                        <h2 className='lead'>Score: {score} | Time: {time}s</h2>
                    </div>
                </div>
                <GameArea snake={snake} apple={apple} />

                <div className='mt-3'>
                    <ControlPad onKeyDown={handleDir} />
                </div>
            </div>
        </>
    );
};

export default GamePage;
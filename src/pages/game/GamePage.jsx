import React, { useEffect, useState } from 'react';

import GameArea from './components/GameArea.jsx';
import ControlPad from './components/ControlPad.jsx';
import GameOver from './components/GameOver.jsx';
import GameWin from './components/GameWin.jsx';
import SnakeAI from './components/SnakeAI.jsx';

import timeImageSrc from '/src/assets/time.png';

import { useApp } from '../app/AppContext.jsx';
import { useSettings } from '../menu/context/SettingsContext.jsx';
import { useImages } from '../../images/ImagesContext.jsx';

const GamePage = () => {
    const { WIDTH_CELLS, HEIGHT_CELLS, CELL_SIZE, DIR_START, SNAKE_START, DIRECTIONS, FOOD_START, handlePageIndex } = useApp();
    const { inmortalMode, AIMode, foodIndex } = useSettings();
    const { foodImages } = useImages();
    const { tickTime } = useSettings();

    const [timer, setTimer] = useState(0);
    const [startTime, setStartTime] = useState(undefined);
    const [finishTime, setFinishTime] = useState(undefined);

    const [snake, setSnake] = useState(SNAKE_START);
    const [food, setFood] = useState(FOOD_START);
    const [score, setScore] = useState(0);

    const [nextDir, setNextDir] = useState([]);
    const [dir, setDir] = useState(DIR_START);

    const [gameStatus, setGameStatus] = useState(0); // 0 Not Started, 1 Started, 2 GameOver (3 Win)

    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const generateFood = (snake) => {
        let newFood;
        do {
            newFood = { x: getRandomInt(WIDTH_CELLS), y: getRandomInt(HEIGHT_CELLS) };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));

        setFood(newFood);
    };

    const foodCollision = (snake) => food !== undefined && snake[0].x === food.x && snake[0].y === food.y;
    const bodyCollision = (snake) => snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
    const wallCollision = (snake) => snake[0].x < 0 || snake[0].y < 0 || snake[0].x >= WIDTH_CELLS || snake[0].y >= HEIGHT_CELLS;
    const checkCollision = (snake) => bodyCollision(snake) || wallCollision(snake);
    const checkWin = (snake) => snake.length === (WIDTH_CELLS) * (HEIGHT_CELLS);
    const handleDir = (keyCode) => {
        const newDir = DIRECTIONS[keyCode];

        if (newDir) {
            setNextDir(actualNextDir => {
                const updatedNextDir = [...actualNextDir];

                // Si la cola esta llena, reemplazamos el ultimo, si no añadimos al final
                if (updatedNextDir.length >= 2) updatedNextDir[1] = newDir;
                else updatedNextDir.push(newDir);

                return updatedNextDir;
            });

            if (gameStatus === 0) { // Si el juego no esta iniciado
                const [dx, dy] = newDir; // Si es un primer movimiento valido
                if (snake[0].x + dx !== snake[1].x || snake[0].y + dy !== snake[1].y) {
                    setStartTime(Date.now()); // Para calcular la diferencia de tiempo
                    setGameStatus(1); // Iniciamos el juego
                }
            }
        }
    };

    useEffect(() => {
        if (gameStatus === 1) { // Siempre se cuenta un frame mas ya que se tiene que comprobar la colision despues de moverse no antes
            const interval = setInterval(() => setTimer(timer => timer + 1), tickTime);
            return () => clearInterval(interval);
        }
    }, [gameStatus]);

    useEffect(() => {
        const handleKeyDown = (event) => handleDir(event.keyCode);
        if (!AIMode) // Si esta en modo automatico no queremos que intervenga el usuario
            document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [snake]);

    useEffect(() => { // THIS METHOD EXECUTES EACH TICK
        if (gameStatus == 1) { // Si el juego está en marcha
            let actualDir;

            let i = 0;
            while (i < nextDir.length && actualDir === undefined) {
                const [dx, dy] = nextDir[i];
                if (snake[0].x + dx !== snake[1].x || snake[0].y + dy !== snake[1].y)
                    actualDir = nextDir[i];

                i++;
            }

            if (actualDir === undefined) actualDir = dir;
            else {
                setDir(actualDir);
                setNextDir(actualNextDir => actualNextDir.slice(i));
            }

            const newSnake = [...snake];
            const head = { x: newSnake[0].x + actualDir[0], y: newSnake[0].y + actualDir[1] };
            newSnake.unshift(head); // Desplazamos la cabeza

            if (!foodCollision(newSnake)) {
                newSnake.pop(); // Si no comemos manzana, quitamos la cola

                const isCollision = checkCollision(newSnake);
                if (isCollision && !inmortalMode) { // Perdemos si hay colisión
                    setFinishTime(Date.now());
                    setGameStatus(2);
                }

                if (!isCollision || !inmortalMode)
                    setSnake(newSnake);
            } else { // Si comemos manzana, generamos otra y sumamos puntos y no quitamos la cola este tick
                setFood({});

                if (!checkWin(newSnake)) generateFood(newSnake);// Si no ganamos generamos otra manzana
                else {// Ganamos si esta el tablero lleno
                    setFinishTime(Date.now());
                    setGameStatus(3);
                }

                setScore(prevScore => prevScore + 1);
                setSnake(newSnake);
            }
        }
    }, [timer]);

    const playAgain = () => {
        setTimer(0);
        setStartTime(undefined);
        setFinishTime(undefined);

        setSnake(SNAKE_START);
        setFood(FOOD_START);
        setScore(0);
        setNextDir([]);
        setDir(DIR_START);
        setGameStatus(0);
    }

    useEffect(() => { // Si cambia la pantalla de tamaño, empezamos de nuevo
        playAgain();
    }, [CELL_SIZE])

    const time = ((finishTime ?? Date.now()) - (startTime ?? Date.now())) / 1000;
    const seconds = Math.floor(time) % 60;
    const minutes = Math.floor((time / 60) % 60);
    const timeString = (minutes > 0 ? minutes + "m " : "") + seconds + "s";

    return (
        <>
            <GameOver gameStatus={gameStatus} playAgain={playAgain} score={score} time={timeString} />
            <GameWin gameStatus={gameStatus} playAgain={playAgain} score={score} time={timeString} />

            <div className='d-flex flex-column justify-content-center align-items-center position-fixed w-100 h-100'
                style={{ backgroundColor: "black" }}>
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center"
                        style={{ width: (WIDTH_CELLS + 2) * CELL_SIZE, height: 2 * CELL_SIZE, backgroundColor: "#4A752C" }}>
                        <div className='d-flex' style={{ marginLeft: CELL_SIZE }}>
                            <div className='d-flex justify-content-center align-items-center' style={{ marginRight: CELL_SIZE }}>
                                <img style={{
                                    width: CELL_SIZE,
                                    height: CELL_SIZE,
                                    marginRight: CELL_SIZE / 4,
                                    imageRendering: 'pixelated'
                                }} src={foodImages[foodIndex].src}></img>
                                <span className='text-white fw-bold'
                                    style={{ fontSize: CELL_SIZE / 1.5 }}>{score}</span>
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img style={{
                                    width: CELL_SIZE,
                                    height: CELL_SIZE,
                                    marginRight: CELL_SIZE / 4,
                                    imageRendering: 'pixelated'
                                }} src={timeImageSrc}></img>
                                <span className='text-white fw-bold'
                                    style={{ fontSize: CELL_SIZE / 1.5 }}>{timeString}</span>
                            </div>
                        </div>
                        <div style={{ marginRight: CELL_SIZE }}>
                            <button className="d-flex justify-content-center align-items-center btn btn-danger m-0 p-0"
                                style={{ width: CELL_SIZE * 2 * 1.25, height: CELL_SIZE * 1.25 }}
                                onClick={() => handlePageIndex(0)}>
                                <span style={{ fontSize: CELL_SIZE / 1.5 }}>Salir</span>
                            </button>
                        </div>
                    </div>

                    <GameArea snake={snake} food={food} gameStatus={gameStatus} />
                </div>


                <ControlPad onKeyDown={handleDir} />
            </div>

            <SnakeAI snake={snake} food={food} AIMode={AIMode} moveSnake={handleDir} />
        </>
    );
};

export default GamePage;

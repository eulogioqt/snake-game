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
const WIDTH_CELLS = CONSTANTS.WIDTH / CONSTANTS.CELL_SIZE;
const HEIGHT_CELLS = CONSTANTS.HEIGHT / CONSTANTS.CELL_SIZE;

const App = () => {
    const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
    const [apple, setApple] = useState(APPLE_START);
    const [score, setScore] = useState(0);
    const [dir, setDir] = useState([0, 0]);
    const [gameOver, setGameOver] = useState(false);

    const dirRef = useRef(dir);
    const snakeRef = useRef(snake);
    const appleRef = useRef(apple);

    const getRandomInt = (max) => Math.floor(Math.random() * max);
    const generateApple = () => {
        let newApple;
        do {
            newApple = { x: getRandomInt(WIDTH_CELLS), y: getRandomInt(HEIGHT_CELLS) };
        } while (snakeRef.current.some(segment => segment.x === newApple.x && segment.y === newApple.y));
        setApple(newApple);
        appleRef.current = newApple;
    };

    const appleCollision = () => appleRef.current !== undefined && snakeRef.current[0].x === appleRef.current.x && snakeRef.current[0].y === appleRef.current.y;
    const bodyCollision = () => {
        const head = snakeRef.current[0];
        return snakeRef.current.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    };
    const wallCollision = () => {
        const head = snakeRef.current[0];
        return head.x < 0 || head.y < 0 || head.x >= WIDTH_CELLS || head.y >= HEIGHT_CELLS;
    };
    const checkCollision = () => bodyCollision() || wallCollision();

    useEffect(() => {
        const handleDir = (keyCode) => {
            const newDir = DIRECTIONS[keyCode];
            if (newDir !== undefined) {
                setDir(actualDir => {
                    const validMove = actualDir[0] !== -newDir[0] || actualDir[1] !== -newDir[1];
                    if (validMove)
                        dirRef.current = newDir;

                    return validMove ? newDir : actualDir;
                });
            }
        }
        const handleKeyDown = (event) => handleDir(event.keyCode);

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (gameOver) return;

        const moveSnake = () => {
            if (checkCollision()) {
                setGameOver(true);
                return;
            }

            setSnake(prevSnake => {
                const newSnake = [...prevSnake];
                const head = { x: newSnake[0].x + dirRef.current[0], y: newSnake[0].y + dirRef.current[1] };

                newSnake.unshift(head);
                if (!appleCollision()) {
                    newSnake.pop();
                } else {
                    generateApple();
                    setScore(prevScore => prevScore + 1);
                }

                snakeRef.current = newSnake;
                return newSnake;
            });
        };

        const interval = setInterval(moveSnake, SPEED);
        return () => clearInterval(interval);
    }, [gameOver]);

    useEffect(() => {
        snakeRef.current = snake;
    }, [snake]);

    useEffect(() => {
        appleRef.current = apple;
    }, [apple]);

    return (
        <div>
            <h1>Snake Game</h1>
            <h2>Score: {score}</h2>
            {gameOver && <h2>Game Over!</h2>}
            <GameArea snake={snake} apple={apple} CONSTANTS={CONSTANTS} />
        </div>
    );
};

export default App;

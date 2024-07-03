import React, { useEffect, useRef, useState } from 'react';
import GameArea from './GameArea';
import "./App.css";

const App = () => {
    const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
    const [score, setScore] = useState(0);

    const dirRef = useRef([0, 0]);

    const SPEED = 250;
    const DIRECTIONS = {
        38: [0, -1], // up
        40: [0, 1], // down
        37: [-1, 0], // left
        39: [1, 0] // right
    };

    useEffect(() => {
        const handleDir = (keyCode) => {
            const newDir = DIRECTIONS[keyCode];
            if (newDir !== undefined) {
                const actualDir = dirRef.current;
                if (actualDir[0] !== -newDir[0] || actualDir[1] !== -newDir[1])
                    dirRef.current = newDir;
            }
        }
        const handleKeyDown = (event) => handleDir(event.keyCode);

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const moveSnake = () => {
            setSnake(prevSnake =>
                [{ x: prevSnake[0].x + dirRef.current[0], y: prevSnake[0].y + dirRef.current[1] }]);
        };

        const interval = setInterval(moveSnake, SPEED);
        return () => clearInterval(interval);
    }, [SPEED]);

    return (
        <div>
            <h1>Snake Game</h1>
            <h2>Score: {score}</h2>
            <GameArea snake={snake} />
        </div>
    );
};

export default App;

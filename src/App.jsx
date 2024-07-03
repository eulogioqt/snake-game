import React, { useEffect, useState } from 'react';
import GameArea from './GameArea';
import "./App.css";

const App = () => {
    const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
    const [dir, setDir] = useState([0, 0]);
    const [score, setScore] = useState(0);

    const SPEED = 250;
    const DIRECTIONS = {
        38: [0, -1], // up
        40: [0, 1], // down
        37: [-1, 0], // left
        39: [1, 0] // right
    };

    const handleDir = (key) => {
        const dir = DIRECTIONS[key];
        if (dir !== undefined)
            setDir(dir);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSnake(snake => {
                return (
                    [{ x: snake[0].x + 1, y: snake[0].y }]
                );
            });
        }, SPEED);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Snake Game</h1>
            <h2>Score: {score}</h2>
            <GameArea snake={snake} />
        </div>
    );
};

export default App;

import { useEffect, useState } from 'react';
import { useApp } from '../../app/AppContext';

const SnakeAI = ({ snake, food, moveSnake, AIMode }) => {
    const [coverCorner, setCoverCorner] = useState(true);
    const { WIDTH_CELLS, HEIGHT_CELLS } = useApp();

    useEffect(() => {
        if (AIMode) {
            const nextMove = calculateNextMove(snake, food);
            if (nextMove)
                moveSnake(nextMove);
        }
    }, [snake, AIMode]);

    const calculateNextMove = (snake, food) => { //38 UP, 40 DOWN, 37 LEFT, 39 RIGHT
        const head = snake[0];

        if (head.x === WIDTH_CELLS - 1) {
            if (head.y === HEIGHT_CELLS - 1)
                return 37;
            else
                return 40;
        } else if (head.y === 0) {
            if (head.x === WIDTH_CELLS - 2) {
                setCoverCorner(value => !value);
                if (coverCorner)
                    return 39;
            }

            if (head.x % 2 === 0)
                return 39;
            else if (head.x % 2 === 1)
                return 40;
        } else if (head.y === 1) {
            if (head.x % 2 === 0)
                return 38;
            else if (head.x % 2 === 1)
                return 39;
        } else if (head.x === 0) {
            if (head.y === 2 || head.y === 1)
                return 38;
            else if (head.y === 0)
                return 39;
            else if (head.y % 2 === 0)
                return 38;
            else if (head.y % 2 === 1)
                return 39;
        } else if (head.x === WIDTH_CELLS - 2) {
            if (head.y % 2 === 0)
                return 37;
            else if (head.y % 2 === 1)
                return 38;
        }

        return 39;
    };

    return null;
};

export default SnakeAI;

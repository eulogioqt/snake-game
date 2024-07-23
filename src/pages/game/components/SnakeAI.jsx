import { useEffect } from 'react';
import { useApp } from '../../app/AppContext';

const SnakeAI = ({ snake, food, moveSnake, AIMode }) => {
    const { DIRECTIONS, WIDTH_CELLS, HEIGHT_CELLS } = useApp();

    useEffect(() => {
        if (AIMode) {
            const nextMove = calculateNextMove(snake, food);
            if (nextMove)
                moveSnake(nextMove);
        }
    }, [snake, AIMode]);

    const canMove = (snake, dir) => {
        const [dx, dy] = DIRECTIONS[dir]

        return snake[0].x + dx !== snake[1].x || snake[0].y + dy !== snake[1].y;
    }

    const calculateNextMove = (snake, food) => { //38 UP, 40 DOWN, 37 LEFT, 39 RIGHT
        const head = snake[0];
        if (head.x < food.x && canMove(snake, 39))
            return 39;
        if (head.x > food.x && canMove(snake, 37))
            return 37;
        if (head.y < food.y && canMove(snake, 40))
            return 40;
        if (head.y > food.y && canMove(snake, 38))
            return 38;
    };

    return null;
};

export default SnakeAI;

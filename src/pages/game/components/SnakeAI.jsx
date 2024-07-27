import { useRef } from 'react';
import { useApp } from '../../app/AppContext';

export const useSnakeAI = () => {
    const { WIDTH_CELLS, HEIGHT_CELLS } = useApp();
    const coverCorner = useRef(true);

    const calculateNextMove = (snake) => { // 38 UP, 40 DOWN, 37 LEFT, 39 RIGHT
        const head = snake[0];

        if (head.x === WIDTH_CELLS - 1) {
            if (head.y === HEIGHT_CELLS - 1)
                return 37; // LEFT
            else
                return 40; // DOWN
        } else if (head.y === 0) {
            if (head.x === WIDTH_CELLS - 2) {
                coverCorner.current = !coverCorner.current;
                if (coverCorner.current)
                    return 39; // RIGHT
            }

            if (head.x % 2 === 0)
                return 39; // RIGHT
            else if (head.x % 2 === 1)
                return 40; // DOWN
        } else if (head.y === 1) {
            if (head.x % 2 === 0)
                return 38; // UP
            else if (head.x % 2 === 1)
                return 39; // RIGHT
        } else if (head.x === 0) {
            if (head.y === 2 || head.y === 1)
                return 38; // UP
            else if (head.y === 0)
                return 39; // RIGHT
            else if (head.y % 2 === 0)
                return 38; // UP
            else if (head.y % 2 === 1)
                return 39; // RIGHT
        } else if (head.x === WIDTH_CELLS - 2) {
            if (head.y % 2 === 0)
                return 37; // LEFT
            else if (head.y % 2 === 1)
                return 38; // UP
        }

        return 39; // RIGHT
    };

    return { calculateNextMove };
};

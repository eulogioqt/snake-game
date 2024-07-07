import { useEffect, useRef } from "react";
import { WIDTH, HEIGHT, CELL_SIZE } from './CONSTANTS.js';


const GameArea = ({ snake, apple }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        ctx.fillStyle = 'red';
        ctx.fillRect(apple.x * CELL_SIZE, apple.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        ctx.fillStyle = 'green';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        });
    }, [snake]);

    return (
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}></canvas>
    );
}

export default GameArea;
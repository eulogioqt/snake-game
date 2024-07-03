import { useEffect, useRef } from "react";

const GameArea = ({ snake, apple, CONSTANTS }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);

        ctx.fillStyle = 'red';
        ctx.fillRect(apple.x * CONSTANTS.CELL_SIZE, apple.y * CONSTANTS.CELL_SIZE, CONSTANTS.CELL_SIZE, CONSTANTS.CELL_SIZE);

        ctx.fillStyle = 'green';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * CONSTANTS.CELL_SIZE, segment.y * CONSTANTS.CELL_SIZE, CONSTANTS.CELL_SIZE, CONSTANTS.CELL_SIZE)
        });
    }, [snake]);

    return (
        <canvas ref={canvasRef} width={CONSTANTS.WIDTH} height={CONSTANTS.HEIGHT}></canvas>
    );
}

export default GameArea;
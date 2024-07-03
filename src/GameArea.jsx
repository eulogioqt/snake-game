import { useEffect, useRef } from "react";

const GameArea = ({ snake }) => {
    const canvasRef = useRef(null);

    const WIDTH = 800;
    const HEIGHT = 600;
    const CELL_SIZE = 20;

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

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
import { useEffect, useRef } from "react";
import { useApp } from "../../app/AppContext";
import { useSettings } from "../../menu/context/SettingsContext";

const GameArea = ({ snake, apple }) => {
    const { WIDTH, HEIGHT, CELL_SIZE } = useApp();
    const { rack, snakeColor, AIMode } = useSettings();
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        ctx.fillStyle = 'red';
        ctx.fillRect(apple.x * CELL_SIZE, apple.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        ctx.fillStyle = snakeColor;
        snake.forEach(segment => {
            ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        });

        if (rack) {
            const WIDTH_CELLS = WIDTH / CELL_SIZE;
            const HEIGHT_CELLS = HEIGHT / CELL_SIZE;

            ctx.fillStyle = 'white';
            for (let i = 0; i < WIDTH_CELLS; i++)
                ctx.fillRect(i * CELL_SIZE, 1, 1, HEIGHT)

            for (let i = 0; i < HEIGHT_CELLS; i++)
                ctx.fillRect(1, i * CELL_SIZE, WIDTH, 1)
        }
    }, [snake]);

    return (
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}></canvas>
    );
}

export default GameArea;
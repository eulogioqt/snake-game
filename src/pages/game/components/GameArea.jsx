import { useEffect, useRef } from "react";

import { useApp } from "../../app/AppContext";
import { useSettings } from "../../menu/context/SettingsContext";
import { useFoodImages, useSnakeImages } from "./Images.jsx";

const GameArea = ({ snake, food }) => {
    const { WIDTH, HEIGHT, CELL_SIZE } = useApp();
    const { foodIndex, rack, snakeColor, AIMode } = useSettings();

    const snakeImages = useSnakeImages(snakeColor);
    const { foodImages } = useFoodImages();

    const canvasRef = useRef(null);

    const drawRotatedImage = (ctx, image, x, y, width, height, angle) => {
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(angle);
        ctx.drawImage(image, -width / 2, -height / 2, width, height);
        ctx.restore();
    };

    // 0 no es giro, 1 giro a la derecha, 2 giro a la izquierda
    const isTwist = (snake, index) => {
        const nextSegment = snake[index - 1];
        const currentSegment = snake[index];
        const prevSegment = snake[index + 1];

        const v1 = { x: currentSegment.x - prevSegment.x, y: currentSegment.y - prevSegment.y };
        const v2 = { x: nextSegment.x - currentSegment.x, y: nextSegment.y - currentSegment.y };

        const crossProduct = v1.x * v2.y - v1.y * v2.x;

        return crossProduct !== 0 ? (crossProduct < 0 ? 2 : 1) : 0;
    };

    // Las imagenes se hacen mirando hacia la derecha
    const calcOrientation = (snake, index, prevIndex) => {
        const segment = snake[index];
        const prevSegment = snake[prevIndex];

        let r = 0;
        if (segment.x === prevSegment.x && segment.y > prevSegment.y) r = Math.PI / 2;
        else if (segment.x === prevSegment.x && segment.y < prevSegment.y) r = -Math.PI / 2;
        else if (segment.x < prevSegment.x && segment.y === prevSegment.y) r = Math.PI;
        else if (segment.x > prevSegment.x && segment.y === prevSegment.y) r = 0;

        return r;
    }

    // Dibuja el canvas en cada actualización de snake o food
    useEffect(() => {
        if (!snakeImages) return;

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        // Desactivar el suavizado de la imagen (hace que las imagenes 16x16 escalen bien)
        ctx.imageSmoothingEnabled = false;

        // Fondo
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Manzana
        ctx.drawImage(foodImages[foodIndex], food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        // Dibuja la cuadrícula si está activada
        if (rack) {
            const WIDTH_CELLS = WIDTH / CELL_SIZE;
            const HEIGHT_CELLS = HEIGHT / CELL_SIZE;

            ctx.fillStyle = 'white';
            for (let i = 0; i < WIDTH_CELLS; i++)
                ctx.fillRect(i * CELL_SIZE, 0, 1, HEIGHT);

            for (let i = 0; i < HEIGHT_CELLS; i++)
                ctx.fillRect(0, i * CELL_SIZE, WIDTH, 1);
        }

        // Cabeza
        const headAngle = calcOrientation(snake, 0, 1);
        drawRotatedImage(ctx, snakeImages.head, snake[0].x * CELL_SIZE, snake[0].y * CELL_SIZE, CELL_SIZE, CELL_SIZE, headAngle);

        // Cuerpo
        snake.forEach((segment, index) => {
            if (index > 0 && index < snake.length - 1) {
                const bodyAngle = calcOrientation(snake, index, index + 1);
                const twist = isTwist(snake, index);

                if (twist == 0) {
                    drawRotatedImage(ctx, snakeImages.body, segment.x * CELL_SIZE,
                        segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, bodyAngle);
                } else if (twist == 1) {
                    drawRotatedImage(ctx, snakeImages.bodyTwist, segment.x * CELL_SIZE,
                        segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, bodyAngle);
                } else if (twist == 2) {
                    drawRotatedImage(ctx, snakeImages.bodyTwist, segment.x * CELL_SIZE,
                        segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, bodyAngle + Math.PI / 2);
                }
            }
        });

        // Cola
        const tailAngle = calcOrientation(snake, snake.length - 1, snake.length - 2) - Math.PI;
        drawRotatedImage(ctx, snakeImages.tail, snake[snake.length - 1].x * CELL_SIZE, snake[snake.length - 1].y * CELL_SIZE, CELL_SIZE, CELL_SIZE, tailAngle);
    }, [snake, food, snakeImages, rack]);

    return (
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}></canvas>
    );
}

export default GameArea;

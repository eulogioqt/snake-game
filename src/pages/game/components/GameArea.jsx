import { useEffect, useRef } from "react";
import { useApp } from "../../app/AppContext";
import { useSettings } from "../../menu/context/SettingsContext";

import appleImageSrc from '/src/assets/apple.png';
import tailImageSrc from '/src/assets/tail.png';
import bodyImageSrc from '/src/assets/body.png';
import bodyTwistImageSrc from '/src/assets/bodyTwist.png';
import headImageSrc from '/src/assets/head.png';

const appleImage = new Image();
appleImage.src = appleImageSrc;

const tailImage = new Image();
tailImage.src = tailImageSrc;

const bodyImage = new Image();
bodyImage.src = bodyImageSrc;

const bodyTwistImage = new Image();
bodyTwistImage.src = bodyTwistImageSrc;

const headImage = new Image();
headImage.src = headImageSrc;


const GameArea = ({ snake, apple }) => {
    const { WIDTH, HEIGHT, CELL_SIZE } = useApp();
    const { rack, snakeColor, AIMode } = useSettings();
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

    // Dibuja el canvas en cada actualización de snake o apple
    useEffect(() => {

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        // Desactivar el suavizado de la imagen (hace que las imagenes 16x16 escalen bien)
        ctx.imageSmoothingEnabled = false;

        // Fondo
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Manzana
        ctx.drawImage(appleImage, apple.x * CELL_SIZE, apple.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

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
        drawRotatedImage(ctx, headImage, snake[0].x * CELL_SIZE, snake[0].y * CELL_SIZE, CELL_SIZE, CELL_SIZE, headAngle);

        // Cuerpo
        snake.forEach((segment, index) => {
            if (index > 0 && index < snake.length - 1) {
                const bodyAngle = calcOrientation(snake, index, index + 1);
                const twist = isTwist(snake, index);

                if (twist == 0) {
                    drawRotatedImage(ctx, bodyImage, segment.x * CELL_SIZE,
                        segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, bodyAngle);
                } else if (twist == 1) {
                    drawRotatedImage(ctx, bodyTwistImage, segment.x * CELL_SIZE,
                        segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, bodyAngle);
                } else if (twist == 2) {
                    drawRotatedImage(ctx, bodyTwistImage, segment.x * CELL_SIZE,
                        segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE, bodyAngle + Math.PI / 2);
                }
            }
        });

        // Cola
        const tailAngle = calcOrientation(snake, snake.length - 1, snake.length - 2) - Math.PI;
        drawRotatedImage(ctx, tailImage, snake[snake.length - 1].x * CELL_SIZE, snake[snake.length - 1].y * CELL_SIZE, CELL_SIZE, CELL_SIZE, tailAngle);
    }, [snake, apple, WIDTH, HEIGHT, CELL_SIZE, snakeColor, rack]);

    return (
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}></canvas>
    );
}

export default GameArea;

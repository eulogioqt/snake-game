import { useEffect, useRef, useState } from "react";

import arrowsTutorialSrc from '/src/assets/arrowsTutorial.png';

import { useApp } from "../../app/AppContext";
import { useSettings } from "../../menu/context/SettingsContext";
import { useImages } from "../../../images/ImagesContext.jsx";

const GameArea = ({ snake, foodList, gameStatus }) => {
    const { WIDTH_CELLS, HEIGHT_CELLS, CELL_SIZE } = useApp();
    const { foodIndex, rack } = useSettings();
    const { snakeImages, foodImages } = useImages();

    const [foodListType, setFoodListType] = useState({});
    const canvasRef = useRef(null);

    const cantorize = (x, y) => (x + y) * (x + y + 1) / 2 + x;
    const decantorize = (n) => {
        const k = Math.floor((-1 + Math.sqrt(1 + 8 * n)) / 2);

        const x = n - (k * (k + 1)) / 2;
        const y = k - x;

        return { x, y };
    };

    useEffect(() => {
        const newFoodListType = { ...foodListType };
        const foodTypes = Object.keys(foodImages);

        foodList.forEach(food => {
            const id = cantorize(food.x, food.y);
            if (!foodListType[id]) {
                let foodKey = foodIndex;
                if (foodKey === "random")
                    foodKey = foodTypes[Math.floor(Math.random() * foodTypes.length)]

                newFoodListType[id] = foodKey;
            }
        });

        const foodListIds = new Set(foodList.map(food => cantorize(food.x, food.y).toString()));
        Object.keys(newFoodListType).forEach(foodId => {
            if (!foodListIds.has(foodId)) {
                delete newFoodListType[foodId];
            }
        });

        setFoodListType(newFoodListType);
    }, [foodList]);

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
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, WIDTH_CELLS * CELL_SIZE, HEIGHT_CELLS * CELL_SIZE);

        // Desactivar el suavizado de la imagen (hace que las imagenes 16x16 escalen bien)
        ctx.imageSmoothingEnabled = false;

        // Fondo
        for (let i = 0; i <= WIDTH_CELLS; i++) {
            for (let j = 0; j <= HEIGHT_CELLS; j++) {
                ctx.fillStyle = ((i + j) % 2 == 0) ? '#AAD751' : '#A2D149';
                ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }

        // Comida
        Object.keys(foodListType).forEach(foodId => {
            const { x, y } = decantorize(foodId);
            const foodKey = foodListType[foodId];

            ctx.drawImage(foodImages[foodKey], x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        });

        // Dibuja la cuadrícula si está activada
        if (rack) {
            ctx.fillStyle = 'white';
            for (let i = 0; i < WIDTH_CELLS; i++)
                ctx.fillRect(i * CELL_SIZE, 0, 1, HEIGHT_CELLS * CELL_SIZE);

            for (let i = 0; i < HEIGHT_CELLS; i++)
                ctx.fillRect(0, i * CELL_SIZE, WIDTH_CELLS * CELL_SIZE, 1);
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
    }, [snake, foodListType, CELL_SIZE]);

    const arrowsTutorial = (
        gameStatus === 0 &&
        <img src={arrowsTutorialSrc} style={{
            position: "absolute",
            width: CELL_SIZE * 4,
            height: CELL_SIZE * 4,
            top: CELL_SIZE * 3,
            imageRendering: 'pixelated'
        }}></img>
    );

    return (
        <div className="position-relative d-flex justify-content-center align-items-center"
            style={{ width: (WIDTH_CELLS + 2) * CELL_SIZE, height: (HEIGHT_CELLS + 2) * CELL_SIZE, backgroundColor: "#578A34" }}>
            {/*<button className="btn btn-primary position-absolute" style={{ top: 8, left: 8 }}>Arriba Izquierda</button>
            <button className="btn btn-primary position-absolute" style={{ top: 8, right: 8 }}>Arriba Derecha</button>
            <button className="btn btn-primary position-absolute" style={{ bottom: 8, left: 8 }}>Abajo Izquierda</button>
            <button className="btn btn-primary position-absolute" style={{ bottom: 8, right: 8 }}>Abajo Derecha</button>*/}
            {arrowsTutorial}
            <canvas ref={canvasRef} width={WIDTH_CELLS * CELL_SIZE} height={HEIGHT_CELLS * CELL_SIZE}></canvas>
        </div>
    );
}

export default GameArea;

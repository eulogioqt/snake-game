import { useEffect, useRef, useState } from "react";
import arrowsTutorialSrc from '/src/assets/arrowsTutorial.png';

import { useApp } from "../../app/AppContext";
import { useSettings } from "../../menu/context/SettingsContext";
import { useImages } from "../../../images/ImagesContext.jsx";
import { useCanvasUtils } from "../../../utils/CanvasUtils.jsx";

const GameArea = ({ snake, foodList, gameStatus }) => {
    const { WIDTH_CELLS, HEIGHT_CELLS, CELL_SIZE } = useApp();
    const { foodIndex, rack } = useSettings();
    const { snakeImages, foodImages } = useImages();

    const [foodListType, setFoodListType] = useState({});
    const canvasRef = useRef(null);
    const canvasUtils = useCanvasUtils(canvasRef, CELL_SIZE);

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
                if (foodKey === "random") {
                    foodKey = foodTypes[Math.floor(Math.random() * foodTypes.length)];
                }
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

    // Todo esto es respecto a la derecha, 0 grados es una linea a la derecha, 90 es una linea arriba
    const calcOrientation = (snake, index, prevIndex) => {
        const segment = snake[index];
        const prevSegment = snake[prevIndex];

        let r = 0;
        if (segment.x === prevSegment.x && segment.y > prevSegment.y) r = Math.PI / 2;
        else if (segment.x === prevSegment.x && segment.y < prevSegment.y) r = 3 * Math.PI / 2;
        else if (segment.x < prevSegment.x && segment.y === prevSegment.y) r = Math.PI;
        else if (segment.x > prevSegment.x && segment.y === prevSegment.y) r = 0;

        return r;
    }

    useEffect(() => {
        if (!canvasUtils) return;

        // Limpia el canvas
        canvasUtils.clearRect(0, 0, WIDTH_CELLS, HEIGHT_CELLS);

        // Fondo
        for (let i = 0; i <= WIDTH_CELLS; i++) {
            for (let j = 0; j <= HEIGHT_CELLS; j++) {
                canvasUtils.fillRect(((i + j) % 2 == 0) ? '#AAD751' : '#A2D149', i, j, 1, 1);
            }
        }

        // Comida
        Object.keys(foodListType).forEach(foodId => {
            const { x, y } = decantorize(foodId);
            const foodKey = foodListType[foodId];
            canvasUtils.drawImage(foodImages[foodKey], x, y, 1, 1);
        });

        // Dibuja la cuadrícula si está activada
        if (rack) {
            canvasUtils.fillRect('white', 0, 0, WIDTH_CELLS, 1); // líneas verticales
            canvasUtils.fillRect('white', 0, 0, 1, HEIGHT_CELLS); // líneas horizontales
        }

        // Cabeza
        const headAngle = calcOrientation(snake, 0, 1);
        canvasUtils.drawRotatedImage(snakeImages.head, snake[0].x, snake[0].y, 1, 1, headAngle);

        // Cuerpo
        snake.forEach((segment, index) => {
            if (index > 0 && index < snake.length - 1) {
                const bodyAngle = calcOrientation(snake, index, index + 1);
                const twist = isTwist(snake, index);

                if (twist === 0) {
                    canvasUtils.drawRotatedImage(snakeImages.body, segment.x, segment.y, 1, 1, bodyAngle);
                } else if (twist === 1) {
                    canvasUtils.drawRotatedImage(snakeImages.bodyTwist, segment.x, segment.y, 1, 1, bodyAngle);
                } else if (twist === 2) {
                    canvasUtils.drawRotatedImage(snakeImages.bodyTwist, segment.x, segment.y, 1, 1, bodyAngle + Math.PI / 2);
                }
            }
        });

        // Cola
        const tailAngle = calcOrientation(snake, snake.length - 1, snake.length - 2) - Math.PI;
        canvasUtils.drawRotatedImage(snakeImages.tail, snake[snake.length - 1].x, snake[snake.length - 1].y, 1, 1, tailAngle);
    }, [snake, foodListType, canvasUtils]);

    const arrowsTutorial = (
        gameStatus === 0 &&
        <img src={arrowsTutorialSrc} style={{
            position: "absolute",
            width: CELL_SIZE * 4,
            height: CELL_SIZE * 4,
            top: CELL_SIZE * 3,
            imageRendering: 'pixelated'
        }} />
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

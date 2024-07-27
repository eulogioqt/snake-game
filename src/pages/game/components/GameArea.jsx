import { useEffect, useRef, useState } from "react";

import { useApp } from "../../app/AppContext";
import { useSettings } from "../../menu/context/SettingsContext";
import { useImages } from "../../../images/ImagesContext.jsx";
import { useCanvasUtils } from "../../../utils/CanvasUtils.jsx";

import { cantorize, decantorize, isTwist, calcOrientation } from "../../../utils/MathUtils.jsx";

const GameArea = ({ snake, foodList }) => {
    const { WIDTH_CELLS, HEIGHT_CELLS, CELL_SIZE } = useApp();
    const { foodIndex } = useSettings();
    const { snakeImages, foodImages } = useImages();

    const [foodListType, setFoodListType] = useState({});
    const canvasRef = useRef(null);
    const canvasUtils = useCanvasUtils(canvasRef, CELL_SIZE);

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

    useEffect(() => {
        if (!canvasUtils)
            return;

        // Limpia el canvas
        const clearCanvas = () => canvasUtils.clearRect(0, 0, WIDTH_CELLS, HEIGHT_CELLS);
        clearCanvas();

        // Fondo
        const drawBackground = () => {
            const oddColor = '#AAD751';
            const evenColor = '#A2D149';

            for (let i = 0; i <= WIDTH_CELLS; i++) {
                for (let j = 0; j <= HEIGHT_CELLS; j++) {
                    const cellColor = ((i + j) % 2 == 0) ? oddColor : evenColor;

                    canvasUtils.fillRect(cellColor, i, j, 1, 1);
                }
            }
        }
        drawBackground();

        // Comida
        const drawFood = () => {
            Object.keys(foodListType).forEach(foodId => {
                const { x, y } = decantorize(foodId);
                const foodKey = foodListType[foodId];
                const foodImage = foodImages[foodKey];

                canvasUtils.drawImage(foodImage, x, y, 1, 1);
            });
        }
        drawFood();

        // Cabeza
        const drawSnakeHead = () => {
            const headAngle = calcOrientation(snake, 0, 1);
            const snakeHead = snakeImages.head;
            const headX = snake[0].x;
            const headY = snake[0].y;

            canvasUtils.drawRotatedImage(snakeHead, headX, headY, 1, 1, headAngle);
        }
        drawSnakeHead();

        // Cuerpo
        const drawSnakeBody = () => {
            snake.forEach((segment, index) => {
                if (index > 0 && index < snake.length - 1) {
                    const bodyAngle = calcOrientation(snake, index, index + 1);
                    const twist = isTwist(snake, index);

                    const bodyImage = snakeImages.body;
                    const bodyTwistImage = snakeImages.bodyTwist;
                    const bodyX = segment.x;
                    const bodyY = segment.y;

                    if (twist === 0) {
                        canvasUtils.drawRotatedImage(bodyImage, bodyX, bodyY, 1, 1, bodyAngle);
                    } else {
                        const addAngle = twist === 2 ? Math.PI / 2 : 0;
                        canvasUtils.drawRotatedImage(bodyTwistImage, bodyX, bodyY, 1, 1, bodyAngle + addAngle);
                    }
                }
            });
        }
        drawSnakeBody();

        // Cola
        const drawSnakeTail = () => {
            const tailAngle = calcOrientation(snake, snake.length - 2, snake.length - 1);
            const tailImage = snakeImages.tail;
            const tailX = snake[snake.length - 1].x;
            const tailY = snake[snake.length - 1].y;

            canvasUtils.drawRotatedImage(tailImage, tailX, tailY, 1, 1, tailAngle);
        }
        drawSnakeTail();
    }, [snake, foodListType, canvasUtils]);

    return <canvas ref={canvasRef} width={WIDTH_CELLS * CELL_SIZE} height={HEIGHT_CELLS * CELL_SIZE} />;
}

export default GameArea;

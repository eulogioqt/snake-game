import { useEffect, useRef, useState } from "react";
import { useApp } from "../../app/AppContext";
import { useSettings } from "../../menu/context/SettingsContext";
import { useImages } from "../../../images/ImagesContext.jsx";
import { cantorize, decantorize, isTwist, calcOrientation } from "../../../utils/MathUtils.jsx";
import { useCanvasUtils } from "../../../utils/CanvasUtils.jsx";

const GameArea = ({ snake, foodList }) => {
    const { WIDTH_CELLS, HEIGHT_CELLS, CELL_SIZE } = useApp();
    const { foodIndex, backgroundStyle } = useSettings();
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
        const { clearRect, drawImage, translate, drawRotatedImage, fillRect } = canvasUtils;

        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Limpia el canvas
        clearRect(0, 0, WIDTH_CELLS, HEIGHT_CELLS);

        // Fondo
        const drawBackground = () => {
            const oddColor = backgroundStyle[0];
            const evenColor = backgroundStyle[1];

            for (let i = 0; i < WIDTH_CELLS; i++) {
                for (let j = 0; j < HEIGHT_CELLS; j++) {
                    const cellColor = ((i + j) % 2 === 0) ? oddColor : evenColor;
                    fillRect(cellColor, i, j, 1, 1);
                }
            }
        };
        drawBackground();

        // Comida
        const drawFood = () => {
            Object.keys(foodListType).forEach(foodId => {
                const { x, y } = decantorize(foodId);
                const foodKey = foodListType[foodId];
                const foodImage = foodImages[foodKey];

                drawImage(foodImage, x, y, 1, 1);
            });
        };
        drawFood();

        // Cabeza
        const drawSnakeHead = () => {
            const headAngle = calcOrientation(snake, 0, 1);
            const snakeHead = snakeImages.head;
            const headX = snake[0].x;
            const headY = snake[0].y;

            ctx.save();
            translate((headX + 0.5), (headY + 0.5));
            ctx.rotate(headAngle);
            drawImage(snakeHead, -0.5, -0.5, 1, 1);
            ctx.restore();
        };
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

                    ctx.save();
                    translate((bodyX + 0.5), (bodyY + 0.5));
                    ctx.rotate(bodyAngle);
                    if (twist === 0) {
                        drawImage(bodyImage, -0.5, -0.5, 1, 1);
                    } else {
                        const addAngle = twist === 2 ? Math.PI / 2 : 0;
                        ctx.rotate(addAngle);
                        drawImage(bodyTwistImage, -0.5, -0.5, 1, 1);
                    }
                    ctx.restore();
                }
            });
        };
        drawSnakeBody();

        // Cola
        const drawSnakeTail = () => {
            const tailAngle = calcOrientation(snake, snake.length - 2, snake.length - 1);
            const tailImage = snakeImages.tail;
            const tailX = snake[snake.length - 1].x;
            const tailY = snake[snake.length - 1].y;

            ctx.save();
            translate((tailX + 0.5), (tailY + 0.5));
            ctx.rotate(tailAngle);
            drawImage(tailImage, -0.5, -0.5, 1, 1);
            ctx.restore();
        };
        drawSnakeTail();
    }, [snake, foodListType, canvasUtils]);

    return (
        <div
            className="position-relative d-flex justify-content-center align-items-center"
            style={{
                width: WIDTH_CELLS * CELL_SIZE,
                height: HEIGHT_CELLS * CELL_SIZE,
                position: "relative"
            }}
        >
            <canvas ref={canvasRef} style={{
                width: '100%',
                height: '100%',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
            }} />
        </div>
    );
};

export default GameArea;

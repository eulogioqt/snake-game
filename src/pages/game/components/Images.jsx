import { useEffect, useState } from 'react';

import tailImageSrc from '/src/assets/tail.png';
import bodyImageSrc from '/src/assets/body.png';
import bodyTwistImageSrc from '/src/assets/bodyTwist.png';
import headImageSrc from '/src/assets/head.png';

import appleImageSrc from '/src/assets/apple.png';
import blueberryImageSrc from '/src/assets/blueberry.png';
import bananaImageSrc from '/src/assets/banana.png';
import cherryImageSrc from '/src/assets/cherry.png';

const hexToRgb = (hex) => {
    hex = hex.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
};

const replaceImagePixels = (imageObj, replaceColor) => {
    const canvas = document.createElement('canvas');
    canvas.width = imageObj.width;
    canvas.height = imageObj.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(imageObj, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const [r, g, b] = hexToRgb(replaceColor);

    for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 127) {
            data[i] = r;       // Rojo
            data[i + 1] = g;   // Verde
            data[i + 2] = b;   // Azul
            data[i + 3] = 255; // Alfa
        }
    }

    ctx.putImageData(imageData, 0, 0);

    const newImage = new Image();
    newImage.src = canvas.toDataURL();

    return newImage;
};

export const useSnakeImages = (snakeColor) => {
    const [snakeImages, setSnakeImages] = useState(undefined);

    const images = {
        tail: tailImageSrc,
        body: bodyImageSrc,
        bodyTwist: bodyTwistImageSrc,
        head: headImageSrc,
    }

    useEffect(() => {
        const loadedImages = {};
        let imagesLoadedCount = 0;
        const totalImages = Object.keys(images).length;

        const checkIfAllImagesLoaded = () => {
            if (imagesLoadedCount === totalImages)
                setSnakeImages(loadedImages);
        };

        Object.keys(images).forEach((key) => {
            const imageObj = new Image();
            imageObj.src = images[key];
            imageObj.onload = () => {
                loadedImages[key] = replaceImagePixels(imageObj, snakeColor);

                imagesLoadedCount++;
                checkIfAllImagesLoaded();
            };
        });

    }, [snakeColor]);

    return snakeImages;
};

// FOOD

const getAverageColor = (imageObj) => {
    if (!imageObj || imageObj.width === 0) return [0, 0, 0];

    const canvas = document.createElement('canvas');
    canvas.width = imageObj.width;
    canvas.height = imageObj.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(imageObj, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let [r, g, b, n] = [0, 0, 0, 0];
    for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 10) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            n++;
        }
    }

    const [R, G, B] = [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
    const decToHex = (dec) => {
        let hex = dec.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return "#" + decToHex(R) + decToHex(G) + decToHex(B);;
};

export const useFoodImages = () => {
    const [foodImages, setFoodImages] = useState(undefined);
    const [foodColor, setFoodColor] = useState(undefined);

    const images = {
        apple: appleImageSrc,
        blueberry: blueberryImageSrc,
        banana: bananaImageSrc,
        cherry: cherryImageSrc
    };

    useEffect(() => {
        const loadedImages = {};
        const loadedColors = {};

        let imagesLoadedCount = 0;
        const totalImages = Object.keys(images).length;

        const checkIfAllImagesLoaded = () => {
            if (imagesLoadedCount === totalImages) {
                setFoodImages(loadedImages);
                setFoodColor(loadedColors);
            }
        };

        Object.keys(images).forEach((key) => {
            const imageObj = new Image();
            imageObj.src = images[key];
            imageObj.onload = () => {
                loadedImages[key] = imageObj;
                loadedColors[key] = getAverageColor(imageObj);

                imagesLoadedCount++;
                checkIfAllImagesLoaded();
            };
        });

    }, []);

    return { foodImages, foodColor };
};
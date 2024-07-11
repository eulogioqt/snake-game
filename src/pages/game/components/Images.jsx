import { useEffect, useState } from 'react';

import appleImageSrc from '/src/assets/apple.png';
import tailImageSrc from '/src/assets/tail.png';
import bodyImageSrc from '/src/assets/body.png';
import bodyTwistImageSrc from '/src/assets/bodyTwist.png';
import headImageSrc from '/src/assets/head.png';

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
        if (data[i] === 254 && data[i + 1] == 254 && data[i + 2] === 254) {
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

    const noTintImages = {
        apple: appleImageSrc,
    };

    const tintImages = {
        tail: tailImageSrc,
        body: bodyImageSrc,
        bodyTwist: bodyTwistImageSrc,
        head: headImageSrc,
    }

    useEffect(() => {
        const loadedImages = {};
        let imagesLoadedCount = 0;
        const totalImages = Object.keys(tintImages).length + Object.keys(noTintImages).length;

        const checkIfAllImagesLoaded = () => {
            if (imagesLoadedCount === totalImages) {
                setSnakeImages(loadedImages);
            }
        };

        Object.keys(tintImages).forEach((key) => {
            const imageObj = new Image();
            imageObj.src = tintImages[key];
            imageObj.onload = () => {
                loadedImages[key] = replaceImagePixels(imageObj, snakeColor);

                imagesLoadedCount++;
                checkIfAllImagesLoaded();
            };
        });

        Object.keys(noTintImages).forEach((key) => {
            const imageObj = new Image();
            imageObj.src = noTintImages[key];
            loadedImages[key] = imageObj;

            imagesLoadedCount++;
            checkIfAllImagesLoaded();
        });

    }, [snakeColor]);

    return snakeImages;
};
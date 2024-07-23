import { useEffect, useState } from 'react';

import appleImageSrc from '/src/assets/apple.png';
import blueberryImageSrc from '/src/assets/blueberry.png';
import bananaImageSrc from '/src/assets/banana.png';
import cherryImageSrc from '/src/assets/cherry.png';

import { getAverageColor } from './ImageUtils';

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
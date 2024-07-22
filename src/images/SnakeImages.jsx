import { useEffect, useState } from 'react';

import tailImageSrc from '/src/assets/tail.png';
import bodyImageSrc from '/src/assets/body.png';
import bodyTwistImageSrc from '/src/assets/bodyTwist.png';
import headImageSrc from '/src/assets/head.png';

import { replaceImagePixels } from './ImageUtils';

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
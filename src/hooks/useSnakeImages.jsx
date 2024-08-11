import { useEffect, useState } from 'react';

import tailImageSrc from '/src/assets/images/snake/tail.png';
import bodyImageSrc from '/src/assets/images/snake/body.png';
import bodyTwistImageSrc from '/src/assets/images/snake/bodyTwist.png';
import headImageSrc from '/src/assets/images/snake/head.png';
import headOpenMouthImageSrc from '/src/assets/images/snake/headOpenMouth.png';
import headDeadSrc from '/src/assets/images/snake/headDead.png';

import { replaceImagePixels } from '../utils/ImageUtils';

export const useSnakeImages = (snakeColor) => {
    const [snakeImages, setSnakeImages] = useState(undefined);

    const images = {
        tail: tailImageSrc,
        body: bodyImageSrc,
        bodyTwist: bodyTwistImageSrc,
        head: headImageSrc,
        headOpenMouth: headOpenMouthImageSrc,
        headDead: headDeadSrc
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
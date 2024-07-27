import { useEffect } from 'react';

export const useCanvasUtils = (canvasRef, scale = 1, smoothing = false) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (ctx) {  // The key of good resolution
            const deviceScale = Math.floor(0.99 + window.devicePixelRatio) || 1;
            canvas.width = canvas.clientWidth * deviceScale;
            canvas.height = canvas.clientHeight * deviceScale;
            ctx.scale(deviceScale, deviceScale);
            ctx.imageSmoothingEnabled = smoothing;
        }
    }, []);

    const clearRect = (x, y, w, h) => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(x * scale, y * scale, w * scale, h * scale);
    };

    const drawImage = (image, x, y, w, h) => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.drawImage(image, x * scale, y * scale, w * scale, h * scale);
    };

    const translate = (x, y) => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.translate(x * scale, y * scale);
    };

    const drawRotatedImage = (image, x, y, w, h, angle) => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.save();
        translate(x + w / 2, y + h / 2);
        ctx.rotate(angle);
        drawImage(image, -w / 2, -h / 2, w, h);
        ctx.restore();
    };

    const fillRect = (color, x, y, w, h) => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
    };

    return {
        clearRect,
        drawImage,
        translate,
        drawRotatedImage,
        fillRect
    };
};

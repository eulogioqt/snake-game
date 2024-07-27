export const useCanvasUtils = (canvasRef, scale, smoothing = false) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx)
        return undefined;

    const clearRect = (x, y, w, h) => ctx.clearRect(x * scale, y * scale, w * scale, h * scale);
    const drawImage = (image, x, y, w, h) => ctx.drawImage(image, x * scale, y * scale, w * scale, h * scale);
    const translate = (x, y) => ctx.translate(x * scale, y * scale);

    const drawRotatedImage = (image, x, y, w, h, angle) => {
        ctx.save();
        translate(x + w / 2, y + h / 2);
        ctx.rotate(angle);
        drawImage(image, -w / 2, -h / 2, w, h);
        ctx.restore();
    };

    const fillRect = (color, x, y, w, h) => {
        ctx.fillStyle = color;
        ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
    }

    ctx.imageSmoothingEnabled = smoothing;

    return {
        clearRect,
        drawImage,
        translate,
        drawRotatedImage,
        fillRect
    };
}
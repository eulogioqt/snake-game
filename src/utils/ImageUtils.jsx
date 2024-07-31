/**
 * Convierte un valor decimal a hexadecimal.
 * @param {number} decimal - El valor decimal a convertir.
 * @returns {string} El valor en hexadecimal, con ceros a la izquierda si es necesario.
 */
export const rgbToHex = (decimal) => {
    const hex = decimal.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
};

/**
 * Convierte un color hexadecimal a un array RGB.
 * @param {string} hex - El color en formato hexadecimal.
 * @returns {number[]} Un array con los valores RGB.
 */
export const hexToRgb = (hex) => {
    const cleanedHex = hex.replace('#', '');

    const r = parseInt(cleanedHex.substring(0, 2), 16);
    const g = parseInt(cleanedHex.substring(2, 4), 16);
    const b = parseInt(cleanedHex.substring(4, 6), 16);

    return [r, g, b];
};

/**
 * Reemplaza los píxeles de una imagen con un color dado.
 * @param {HTMLImageElement} imageObj - El objeto de la imagen.
 * @param {string} replaceColor - El color de reemplazo en formato hexadecimal.
 * @returns {HTMLImageElement} Una nueva imagen con los píxeles reemplazados.
 */
export const replaceImagePixels = (imageObj, replaceColor) => {
    const canvas = document.createElement('canvas');
    canvas.width = imageObj.width;
    canvas.height = imageObj.height;
    const context = canvas.getContext('2d');

    context.drawImage(imageObj, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const [r, g, b] = hexToRgb(replaceColor);

    for (let i = 0; i < data.length; i += 4) {
        if (data[i] < 127 && data[i + 1] > 127) { // GitHub compression makes this so difficult
            data[i] = r;       // Rojo
            data[i + 1] = g;   // Verde
            data[i + 2] = b;   // Azul
            data[i + 3] = 255; // Alfa
        }
    }

    context.putImageData(imageData, 0, 0);

    const newImage = new Image();
    newImage.src = canvas.toDataURL();

    return newImage;
};

/**
 * Obtiene el color promedio de una imagen.
 * @param {HTMLImageElement} imageObj - El objeto de la imagen.
 * @returns {string} El color promedio en formato hexadecimal.
 */
export const getAverageColor = (imageObj) => {
    if (!imageObj || imageObj.width === 0) return '#000000';

    const canvas = document.createElement('canvas');
    canvas.width = imageObj.width;
    canvas.height = imageObj.height;
    const context = canvas.getContext('2d');

    context.drawImage(imageObj, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let [totalR, totalG, totalB, pixelCount] = [0, 0, 0, 0];

    for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 10) { // Evitar píxeles casi negros
            totalR += data[i];
            totalG += data[i + 1];
            totalB += data[i + 2];
            pixelCount++;
        }
    }

    if (pixelCount === 0) return '#000000'; // Evitar división por cero

    const averageR = Math.round(totalR / pixelCount);
    const averageG = Math.round(totalG / pixelCount);
    const averageB = Math.round(totalB / pixelCount);

    return `#${rgbToHex(averageR)}${rgbToHex(averageG)}${rgbToHex(averageB)}`;
};
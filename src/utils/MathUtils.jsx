/**
 * Calculate the Cantor pairing function for two non-negative integers.
 * @param {number} x - The first non-negative integer.
 * @param {number} y - The second non-negative integer.
 * @returns {number} The unique integer corresponding to the pair (x, y).
 */
export const cantorize = (x, y) => (x + y) * (x + y + 1) / 2 + x;

/**
 * Decantorize a Cantor pairing function value back into its original pair of non-negative integers.
 * @param {number} n - The Cantor pairing function value.
 * @returns {{x: number, y: number}} An object containing the original pair of non-negative integers {x, y}.
 */
export const decantorize = (n) => {
    const k = Math.floor((-1 + Math.sqrt(1 + 8 * n)) / 2);
    const x = n - (k * (k + 1)) / 2;
    const y = k - x;
    return { x, y };
};

/**
 * Determine if a segment of the snake represents a twist (turn).
 * @param {Array<{x: number, y: number}>} snake - The snake represented as an array of segments {x, y}.
 * @param {number} index - The index of the current segment in the snake array.
 * @returns {number} - 0 if no twist, 1 if a right twist, 2 if a left twist.
 */
export const isTwist = (snake, index) => {
    const nextSegment = snake[index - 1];
    const currentSegment = snake[index];
    const prevSegment = snake[index + 1];

    const v1 = { x: currentSegment.x - prevSegment.x, y: currentSegment.y - prevSegment.y };
    const v2 = { x: nextSegment.x - currentSegment.x, y: nextSegment.y - currentSegment.y };

    const crossProd = v1.x * v2.y - v1.y * v2.x;

    if (crossProd === 0) return 0;
    return crossProd < 0 ? 2 : 1;
};

/**
 * Calculate the orientation of a segment of the snake relative to a previous segment.
 * @param {Array<{x: number, y: number}>} snake - The snake represented as an array of segments {x, y}.
 * @param {number} index - The index of the current segment in the snake array.
 * @param {number} prevIndex - The index of the previous segment in the snake array.
 * @returns {number} - The orientation angle in radians (0, π/2, π, or 3π/2).
 */
export const calcOrientation = (snake, index, prevIndex) => {
    const segment = snake[index];
    const prevSegment = snake[prevIndex];

    if (segment.x === prevSegment.x)
        return segment.y > prevSegment.y ? Math.PI / 2 : 3 * Math.PI / 2;

    return segment.x > prevSegment.x ? 0 : Math.PI;
};

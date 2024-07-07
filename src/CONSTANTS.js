export const SPEED = 100;

export const WIDTH = Math.floor(window.innerWidth * 75 / (100 * 20)) * 20;
export const HEIGHT = Math.floor(window.innerHeight * 50 / (100 * 20)) * 20;
export const CELL_SIZE = 20;

export const DIR_START = [1, 0];
export const SNAKE_START = [{ x: 0, y: 0 }, { x: 1, y: 0 }];

export const DIRECTIONS = {
    38: [0, -1], // up
    40: [0, 1], // down
    37: [-1, 0], // left
    39: [1, 0] // right
};

export const APPLE_START = { x: 5, y: 1 };

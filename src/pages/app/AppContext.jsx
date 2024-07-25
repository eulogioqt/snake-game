import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();
const SPRITE_PIXELS = 8; // (16x16)

export const AppProvider = ({ children }) => {
    const { width, height } = useWindowSize();
    const isLarge = useIsLarge();

    const [pageIndex, setPageIndex] = useState(0);
    const getPageIndex = () => pageIndex;
    const handlePageIndex = (pageIndex) => setPageIndex(pageIndex);

    const WIDTH_CELLS = isLarge ? 17 : 13; // PC 15x17
    const HEIGHT_CELLS = isLarge ? 15 : 19; // MOBILE 13x19 // ON GOOGLE IS 11x21
    const CELL_SIZE = Math.min(
        Math.floor(width * (isLarge ? 0.8 : 0.95) / (WIDTH_CELLS * SPRITE_PIXELS)) * SPRITE_PIXELS,
        Math.floor(height * (isLarge ? 0.8 : 0.6) / (HEIGHT_CELLS * SPRITE_PIXELS)) * SPRITE_PIXELS
    );

    const DIR_START = [1, 0];
    const SNAKE_START = [{ x: 3, y: (HEIGHT_CELLS - 1) / 2 }, { x: 2, y: (HEIGHT_CELLS - 1) / 2 }];
    const FOOD_START = { x: WIDTH_CELLS - 3, y: (HEIGHT_CELLS - 1) / 2 };

    const DIRECTIONS = {
        38: [0, -1],  // up (arrow)
        40: [0, 1],   // down (arrow)
        37: [-1, 0],  // left (arrow)
        39: [1, 0],   // right (arrow)
        87: [0, -1],  // W (up)
        83: [0, 1],   // S (down)
        65: [-1, 0],  // A (left)
        68: [1, 0]    // D (right)
    };

    return (
        <AppContext.Provider
            value={{
                WIDTH_CELLS,
                HEIGHT_CELLS,
                CELL_SIZE,
                DIR_START,
                SNAKE_START,
                DIRECTIONS,
                FOOD_START,
                handlePageIndex,
                getPageIndex,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);

export const useWindowSize = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { width, height };
};

export const useIsLarge = () => {
    const { width } = useWindowSize();

    return width > 768;
};

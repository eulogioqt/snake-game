import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [pageIndex, setPageIndex] = useState(0);
    const getPageIndex = () => pageIndex;
    const handlePageIndex = (pageIndex) => setPageIndex(pageIndex);

    const SPEED = 100;

    const WIDTH = Math.floor(window.innerWidth * 75 / (100 * 20)) * 20;
    const HEIGHT = Math.floor(window.innerHeight * 50 / (100 * 20)) * 20;
    const CELL_SIZE = 20;

    const DIR_START = [1, 0];
    const SNAKE_START = [{ x: 1, y: 0 }, { x: 0, y: 0 }];

    const DIRECTIONS = {
        38: [0, -1], // up
        40: [0, 1], // down
        37: [-1, 0], // left
        39: [1, 0] // right
    };

    const APPLE_START = { x: 5, y: 1 };

    return (
        <AppContext.Provider
            value={{
                SPEED,
                WIDTH,
                HEIGHT,
                CELL_SIZE,
                DIR_START,
                SNAKE_START,
                DIRECTIONS,
                APPLE_START,
                handlePageIndex,
                getPageIndex,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
export const useIsLarge = () => {
    const [isLarge, setIsLarge] = useState(window.innerWidth >= 576);

    useEffect(() => {
        const handleResize = () => {
            setIsLarge(window.innerWidth >= 576);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isLarge;
};

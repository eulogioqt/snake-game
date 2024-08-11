import React, { createContext, useContext } from "react";

import { useSettings } from "./SettingsContext.jsx";
import { useSnakeImages } from "../images/SnakeImages.jsx";
import { useFoodImages } from "../images/FoodImages.jsx";

const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
    const { snakeColor } = useSettings();

    const snakeImages = useSnakeImages(snakeColor);
    const { foodImages, foodColor } = useFoodImages();

    const imagesLoaded = () => snakeImages && foodImages && foodColor;

    return (
        <ImagesContext.Provider
            value={{
                snakeImages,
                foodImages,
                foodColor,
                imagesLoaded
            }}
        >
            {children}
        </ImagesContext.Provider>
    );
};

export const useImages = () => useContext(ImagesContext);
import React, { createContext, useContext } from "react";

import { useSettings } from "../pages/menu/context/SettingsContext";
import { useSnakeImages } from "./SnakeImages.jsx";
import { useFoodImages } from "./FoodImages.jsx";

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
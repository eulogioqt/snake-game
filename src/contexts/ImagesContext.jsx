import React, { createContext, useContext } from "react";

import { useSettings } from "./SettingsContext.jsx";
import { useSnakeImages } from "../hooks/useSnakeImages.jsx";
import { useFoodImages } from "../hooks/useFoodImages.jsx";

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
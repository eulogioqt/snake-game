import React, { createContext, useContext, useState } from "react";

import redBackgroundSrc from '/src/assets/redBackground.png';
import greenBackgroundSrc from '/src/assets/greenBackground.png';
import blueBackgroundSrc from '/src/assets/blueBackground.png';

const SettingsContext = createContext();

export const backgroundStyles = {
    green: ['#AAD751', '#A2D149', '#578A34', '#4A752C', '#28530A', '#174209'],
    blue: ['#51AAD7', '#49A2D1', '#34578A', '#2C4A75', '#0A2853', '#091742'],
    red: ['#D751AA', '#D149A2', '#8A3457', '#752C4A', '#530A28', '#420917']
}

export const backgronudThumbnails = {
    green: greenBackgroundSrc,
    blue: blueBackgroundSrc,
    red: redBackgroundSrc
}

export const SettingsProvider = ({ children }) => {
    const [foodIndex, setFoodIndex] = useState("apple");
    const [backgroundStyleIndex, setBackgroundStyleIndex] = useState("green");
    const [snakeColor, setSnakeColor] = useState("#00ff00");
    const [foodAmount, setFoodAmount] = useState(1);
    const [tickTime, setTickTime] = useState(150);
    const [AIMode, setAIMode] = useState(false);
    const [inmortalMode, setInmortalMode] = useState(false);
    const [sound, setSound] = useState(true);

    return (
        <SettingsContext.Provider
            value={{
                foodIndex,
                setFoodIndex,
                backgroundStyleIndex,
                setBackgroundStyleIndex,
                snakeColor,
                setSnakeColor,
                foodAmount,
                setFoodAmount,
                tickTime,
                setTickTime,
                AIMode,
                setAIMode,
                inmortalMode,
                setInmortalMode,
                sound,
                setSound
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
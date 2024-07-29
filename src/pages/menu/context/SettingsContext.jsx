import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

const greenStyle = ['#AAD751', '#A2D149', '#578A34', '#4A752C', '#28530A', '#174209'];
const blueStyle = ['#51AAD7', '#49A2D1', '#34578A', '#2C4A75', '#0A2853', '#091742'];
const redStyle = ['#D751AA', '#D149A2', '#8A3457', '#752C4A', '#530A28', '#420917'];

export const SettingsProvider = ({ children }) => {
    const [foodIndex, setFoodIndex] = useState("apple");
    const [backgroundStyle, setBackgroundStyle] = useState(greenStyle);
    const [snakeColor, setSnakeColor] = useState("#00ff00");
    const [foodAmount, setFoodAmount] = useState(1);
    const [tickTime, setTickTime] = useState(150);
    const [AIMode, setAIMode] = useState(false);
    const [inmortalMode, setInmortalMode] = useState(false);

    return (
        <SettingsContext.Provider
            value={{
                foodIndex,
                setFoodIndex,
                backgroundStyle,
                setBackgroundStyle,
                snakeColor,
                setSnakeColor,
                foodAmount,
                setFoodAmount,
                tickTime,
                setTickTime,
                AIMode,
                setAIMode,
                inmortalMode,
                setInmortalMode
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
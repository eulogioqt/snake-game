import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [foodIndex, setFoodIndex] = useState("apple");
    const [snakeColor, setSnakeColor] = useState("#00ff00");
    const [tickTime, setTickTime] = useState(150);
    const [rack, setRack] = useState(false);
    const [AIMode, setAIMode] = useState(false);
    const [inmortalMode, setInmortalMode] = useState(false);

    return (
        <SettingsContext.Provider
            value={{
                foodIndex,
                setFoodIndex,
                snakeColor,
                setSnakeColor,
                tickTime,
                setTickTime,
                rack,
                setRack,
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
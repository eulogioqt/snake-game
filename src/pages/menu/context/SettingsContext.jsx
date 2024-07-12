import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [foodIndex, setFoodIndex] = useState("apple");
    const [rack, setRack] = useState(false);
    const [snakeColor, setSnakeColor] = useState("#00ff00");
    const [AIMode, setAIMode] = useState(false);
    const [inmortalMode, setInmortalMode] = useState(false);

    return (
        <SettingsContext.Provider
            value={{
                foodIndex,
                setFoodIndex,
                rack,
                setRack,
                snakeColor,
                setSnakeColor,
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
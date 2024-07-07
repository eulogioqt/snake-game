import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [rack, setRack] = useState(false);
    const [snakeColor, setSnakeColor] = useState("#00aa00");
    const [AIMode, setAIMode] = useState(false);

    return (
        <SettingsContext.Provider
            value={{
                rack,
                setRack,
                snakeColor,
                setSnakeColor,
                AIMode,
                setAIMode
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
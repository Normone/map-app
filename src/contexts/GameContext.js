import React, { useState } from 'react';

export const GameContext = React.createContext({
    currentLocation: {},
    playerPosition: { x: 0, y: 0 },
    setCurrentLocation: () => {},
    setPlayerPosition: () => {},
    });

    export const GameProvider = ({ children }) => {
    const [currentLocation, setCurrentLocation] = useState({});
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

    return (
        <GameContext.Provider
        value={{ currentLocation, playerPosition, setCurrentLocation, setPlayerPosition }}
        >
        {children}
        </GameContext.Provider>
    );
};
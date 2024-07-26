import React from 'react';
import GameEndScreen from './GameEndScreen';

const GameOver = (props) => {
    return (
        <GameEndScreen
            {...props}
            statusText="¡Has perdido!"
            showCondition={props.gameStatus === 2}
        />
    );
};

export default GameOver;

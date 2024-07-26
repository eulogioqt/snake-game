import React from 'react';
import GameEndScreen from './GameEndScreen';

const GameWin = (props) => {
    return (
        <GameEndScreen
            {...props}
            statusText="¡Has ganado!"
            showCondition={props.gameStatus === 3}
        />
    );
};

export default GameWin;

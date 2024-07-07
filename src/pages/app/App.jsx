import { useApp } from './AppContext';

import MenuPage from "../menu/MenuPage";
import GamePage from "../game/GamePage";

import './App.css';

const App = () => {
    const { getPageIndex } = useApp();
    const pages = {
        0: <MenuPage />,
        1: <GamePage />
    }

    return pages[getPageIndex()];
};

export default App;

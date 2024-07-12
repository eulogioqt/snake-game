import { useApp } from './AppContext';

import MenuPage from "../menu/MenuPage";
import GamePage from "../game/GamePage";

import { useImages } from '../../images/ImagesContext';
import LoadingScreen from '../../images/LoadingScreen';

import './App.css';

const App = () => {
    const { imagesLoaded } = useImages();
    const { getPageIndex } = useApp();
    const pages = {
        0: <MenuPage />,
        1: <GamePage />
    }

    return imagesLoaded() ? pages[getPageIndex()] : <LoadingScreen />;
};

export default App;

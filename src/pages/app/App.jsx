import { useApp } from '../../contexts/AppContext';

import MenuPage from "../menu/MenuPage";
import GamePage from "../game/GamePage";

import { useImages } from '../../contexts/ImagesContext';
import LoadingScreen from './components/LoadingScreen';

import '../../css/app.css';

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

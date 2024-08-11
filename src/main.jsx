import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app/App.jsx';

import { AppProvider } from './contexts/AppContext.jsx';
import { SettingsProvider } from './contexts/SettingsContext.jsx';
import { ImagesProvider } from './contexts/ImagesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <SettingsProvider>
        <AppProvider>
            <ImagesProvider>
                <App />
            </ImagesProvider>
        </AppProvider>
    </SettingsProvider>
);

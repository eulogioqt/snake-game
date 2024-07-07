import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app/App.jsx';

import { AppProvider } from './pages/app/AppContext.jsx';
import { SettingsProvider } from './pages/menu/context/SettingsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AppProvider>
        <SettingsProvider>
            <App />
        </SettingsProvider>
    </AppProvider>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app/App.jsx';

import { AppProvider } from './pages/app/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AppProvider>
        <App />
    </AppProvider>
);

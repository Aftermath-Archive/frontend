import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './components/App.jsx';
import { UserAuthContextProvider } from './contexts/UserAuthContextProvider';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserAuthContextProvider>
            <App />
        </UserAuthContextProvider>
    </StrictMode>
);

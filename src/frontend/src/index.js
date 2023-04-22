import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';

const domain = process.env.NODE_ENV === 'production'? process.env.REACT_APP_AUTH0_DOMAIN : process.env.REACT_APP_AUTH0_DOMAIN_DEV;
const clientId = process.env.NODE_ENV === 'production'? process.env.REACT_APP_AUTH0_CLIENT_ID : process.env.REACT_APP_AUTH0_CLIENT_ID_DEV;
const audience = process.env.NODE_ENV === 'production'? process.env.REACT_APP_AUTH0_AUDIENCE : process.env.REACT_APP_AUTH0_AUDIENCE_DEV;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            audience={audience}
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>
);
    
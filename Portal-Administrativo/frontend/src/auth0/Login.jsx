import React from 'react';
import App from 'C:/SistemaMarcajeMunicipalidadSPS/Portal-Administrativo/frontend/src/App';
import { Auth0Provider } from '@auth0/auth0-react';

function Login(props) {

    const domain = process.env.REACT_APP_AUTH_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;

    return (
        <div>

            <Auth0Provider
                domain={domain}
                clientId={clientId}
                redirectUri={window.location.origin}
            >

            <App />

            </Auth0Provider>

        </div>
    )
}

export default Login;
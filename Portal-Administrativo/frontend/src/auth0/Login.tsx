import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import HomePage from "../components/HomePage/HomePage"

function Login () {
    const domain = process.env.REACT_APP_AUTH_DOMAIN!;
    const clientId = process.env.REACT_APP_AUTH_CLIENT_ID!;
    return (
        
        <div>

            <Auth0Provider
                domain = { domain }
                clientId = { clientId }
                redirectUri = { window.location.origin }
            >

                <HomePage />

            </Auth0Provider>

        </div>
    )
}

export default Login;
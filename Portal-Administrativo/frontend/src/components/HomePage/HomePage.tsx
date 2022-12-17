import React from 'react';
import './Estilos/botones.css';
import './Estilos/pantalla.css';
import Pantalla_Bienvenida from './Pantalla_Bienvenida';
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from "react-router-dom";

function HomePage() {
    const { isAuthenticated } = useAuth0();

    return (
        <div>
            <Pantalla_Bienvenida />

            {
                isAuthenticated
                    ?
                    <Navigate to="/menu_principal" replace={true} />
                    :
                    <></>
            }
        </div>
    );
}

export default HomePage;
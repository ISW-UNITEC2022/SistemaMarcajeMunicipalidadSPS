import React from 'react';
import './Estilos/botones.css';
import './Estilos/pantalla.css';
import LoginButton from './Botones/LoginButton'
import LogoutButton from './Botones/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { Routes, Route, useNavigate, Link, Navigate, Outlet } from 'react-router-dom';

function HomePage() {
    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <div className="fondo">

            <div className='rect_centro'>

                <div className='logo'>

                </div>

                <div className='title'>
                    Bienvenido
                </div>

                {

                    isAuthenticated
                        ?
                        <div className='instruc'>
                            Cierre sesion para cambiar de usuario.

                        </div>
                        :
                        <div className='instruc'>
                            Inicie sesión para ingresar al portal.
                        </div>

                }

                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>
        </div>
    );
}

export default HomePage;
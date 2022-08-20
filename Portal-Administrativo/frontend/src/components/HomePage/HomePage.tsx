import React from 'react';
import './Estilos/botones.css';
import './Estilos/pantalla.css';
import LoginButton from './Botones/LoginButton'
import LogoutButton from './Botones/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'


function App() {
    const { isAuthenticated, isLoading } = useAuth0()

    if (isLoading) {
        return (
            <h1>
                Estamos cargando los datos de tu perfil a nuestra aplicacion.
            </h1>
        )
    }

    return (
        <div className="fondo">

            <div className='rect_centro'>

                <div className='logo'>

                </div>

                <div className='title'>
                    Bienvenido
                </div>

                {

                    isAuthenticated ?
                        <div className='instruc'>
                            Cierre sesión para cambiae de usuario.
                        </div>

                        :
                        <div className='instruc'>
                            Inicie sesión para ingresar al portal.
                        </div>

                }

                {
                    isAuthenticated ? <LogoutButton></LogoutButton> : <LoginButton></LoginButton>
                }

            </div>
        </div>
    );
}

export default App;
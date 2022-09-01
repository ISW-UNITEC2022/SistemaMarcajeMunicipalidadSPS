import React from 'react';
import './Estilos/botones.css';
import './Estilos/pantalla.css';
import LoginButton from './Botones/LoginButton'
import { useAuth0 } from '@auth0/auth0-react'

function Pantalla_Bienvenida() {
    const { isAuthenticated } = useAuth0();

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

                {
                    isAuthenticated
                        ?
                        <></>
                        :
                        <LoginButton />
                }
            </div>
        </div>
    );
}

export default Pantalla_Bienvenida;
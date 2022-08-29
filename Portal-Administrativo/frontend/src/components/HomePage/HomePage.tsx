import React from 'react';
import './Estilos/botones.css';
import './Estilos/pantalla.css';
import Pantalla_Bienvenida from './Pantalla_Bienvenida';
import { useAuth0 } from '@auth0/auth0-react'
import TaskList from '../menu_user_comp/menu_index';

function HomePage() {
    const { isAuthenticated, isLoading } = useAuth0();
    return (
        <div>
            {
                isAuthenticated
                ?
                    <TaskList />
                :
                    <Pantalla_Bienvenida />
            }
        </div>
    );
}

export default HomePage;
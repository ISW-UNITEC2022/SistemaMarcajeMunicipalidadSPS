import { useAuth0 } from '@auth0/auth0-react'
import '../Estilos/botones.css';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout()} className = 'log_out' >
            Cerrar Sesion
        </button>
    )
}

export default LogoutButton;
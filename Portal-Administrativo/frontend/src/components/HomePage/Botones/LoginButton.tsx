import { useAuth0 } from '@auth0/auth0-react'
import '../Estilos/botones.css';

const LoginButton = () => {
    const { loginWithRedirect, } = useAuth0();
    return (

        <button className = 'log_in' onClick={() => loginWithRedirect()}>
            Iniciar Sesion
        </button>
    )
}

export default LoginButton;
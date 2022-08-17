import { useAuth0 } from '@auth0/auth0-react'
import './styles.css'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <button className = 'boton_in' onClick={() => loginWithRedirect()}>
            Login
        </button>
    )
}

export default LoginButton;
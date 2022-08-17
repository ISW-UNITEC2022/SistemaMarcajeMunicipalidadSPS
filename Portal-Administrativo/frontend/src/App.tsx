import React from 'react';
import './App.css';
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Profile from './components/Profile'
import { useAuth0 } from '@auth0/auth0-react'
import './components/styles.css'

function App() {
  const { isAuthenticated , isLoading} = useAuth0()

  if (isLoading){
    return (
      <h1>
        Estamos cargando los datos de tu perfil a nuestra aplicacion.
      </h1>
    )
  }

  return (
    <div className="App">

      <h3>
        Panel de control
      </h3>

      {
        isAuthenticated ? <LogoutButton></LogoutButton> : <LoginButton></LoginButton>
      }

      <br></br>
      <Profile></Profile>
    </div>
  );
}

export default App;

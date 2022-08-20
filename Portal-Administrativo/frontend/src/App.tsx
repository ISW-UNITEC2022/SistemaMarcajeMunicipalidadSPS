import React from 'react';
import './App.css';
import BotonV from './components/BotonV.jsx'
import BotonA from './components/BotonA.jsx'
import BotonHome from './components/BotonHome.jsx'
import BarraSuperior from './components/BarraSuperior.jsx'
import BarraInferior from './components/BarraInferior';
import HomeIcon from '@mui/icons-material/Home';
import CajaTitulo from './components/CajaTitulo';
import Grid from '@mui/material/Grid';

function App() {
  const onButtonClickHandler = () => {
    window.alert('Cerrando Sesión')
  };
  
  return (
    <div>
      <div className='BackApp'>
          <BarraSuperior></BarraSuperior>
          <CajaTitulo input={"Información Empleados"}/>
      </div>
      <div className="App">
        <BotonA>Cerrar Sesión</BotonA>
        <BotonV>
          Configurar Datos de Perfil
        </BotonV>
        <BotonHome>
          <HomeIcon style={{ fontSize: 40 }}/>
        </BotonHome>
      </div>
      <div className='BackApp'>
          <BarraInferior></BarraInferior>
      </div>
    </div>
  );
}

export default App;

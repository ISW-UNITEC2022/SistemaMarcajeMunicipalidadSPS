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
import HomePage from './components/HomePage/HomePage';
import TaskList from './components/menu_user_comp/menu_index';
import Modificar from './components/modificar_empl/modificar.index';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const onButtonClickHandler = () => {
    window.alert('Cerrando Sesión')
  };

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/menu_principal" element={<TaskList />} />
          <Route path="/modificar_empleado" element={<Modificar />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
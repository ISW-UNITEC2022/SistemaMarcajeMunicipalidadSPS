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
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const onButtonClickHandler = () => {
    window.alert('Cerrando Sesión')
  };

  return (
    <div className="App">
      <BrowserRouter>
      <Routes></Routes>
      </BrowserRouter>
      <Route path="/" element={<HomePage />}></Route>
    </div>
  );
}

export default App;
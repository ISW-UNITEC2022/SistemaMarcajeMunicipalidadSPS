import React from 'react';
import './App.css';
import TaskList from './components/menu_user_comp/menu_index';
import ModificarE from './components/modificar_empl/modificar.index';
import FormularioEmpleado from './components/FormularioEmpleado/FormularioEmpleado';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import AsignarSupervisor from './components/AsignarSupervisor/AsignarSupervisor';

function App() {
  const onButtonClickHandler = () => {
    window.alert('Cerrando Sesión')
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu_principal" element={<TaskList />} />
        <Route path="/crear_empleado" element={<FormularioEmpleado />} />
        <Route path="/modificar_empleado" element={<ModificarE/>} />
        <Route path="/asignar_supervisor" element={<AsignarSupervisor />}></Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
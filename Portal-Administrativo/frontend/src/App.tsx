import React from 'react';
import './App.css';
import TaskList from './components/menu_user_comp/menu_index';
import Modificar from './components/modificar_empl/modificar_index';
import FormularioEmpleado from './components/FormularioEmpleado/FormularioEmpleado';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import AsignarSupervisor from './components/AsignarSupervisor/AsignarSupervisor';
import MenuUsuario from './components/MenuUsuario';
import { useAuth0 } from '@auth0/auth0-react';
import BotonHome from './components/BotonHome'

function App() {
  const onButtonClickHandler = () => {
    window.alert('Cerrando Sesión')
  };

  const { isAuthenticated, user } = useAuth0();

  return (
    <BrowserRouter>
    <div>{isAuthenticated? <MenuUsuario input={""}></MenuUsuario>:''}</div>
    <div>{isAuthenticated? <BotonHome></BotonHome>:''}</div>
      <Routes>
        <Route path="/menu_principal" element={<TaskList />} />
        <Route path="/crear_empleado" element={<FormularioEmpleado />} />
        <Route path="/modificar_empleado" element={<Modificar />} />
        <Route path="/asignar_supervisor" element={<AsignarSupervisor />}></Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
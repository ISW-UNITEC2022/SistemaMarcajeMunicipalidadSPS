import React from "react";
import "./App.css";
import TaskList from "./components/Menu Principal/menu_index";
import Modificar from "./components/Modificar Empleados/modificar_index";
import FormularioEmpleado from "./components/FormularioEmpleado/FormularioEmpleado";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import AsignarSupervisor from "./components/AsignarSupervisor/AsignarSupervisor";
import Informacion from "./components/InformacionEmpleados/InformacionEmpleados";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DarBajaAlta from "./components/DarBajaAlta/DarBajaAlta";
import Reporte_Asistencia_Tardia from "./components/Reportes/Reportes Entradas Tardes/Reporte_EntradasTardes";
import Reporte_Asistencia from "./components/Reportes/Reportes Asistencias/Reporte_Asistencias";
import Reporte_Marcas_Incompletas from "./components/Reportes/Reportes Marcas Incompletas/Reporte_MarcasIncompletas";


function App() {
  const onButtonClickHandler = () => {
    window.alert("Cerrando Sesión");
  };

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/menu_principal" element={<TaskList />} />
        <Route path="/crear_empleado" element={<FormularioEmpleado />} />
        <Route path="/modificar_empleado" element={<Modificar />} />
        <Route path="/dar_baja_alta" element={<DarBajaAlta />} />
        <Route path="/asignar_supervisor" element={<AsignarSupervisor />} />
        <Route path="/informacion_empleado" element={<Informacion />} />
        <Route
          path="/reporte_entradas_tardes"
          element={<Reporte_Asistencia_Tardia />}
        />
        <Route path="/reporte_asistencias" element={<Reporte_Asistencia />} />
        <Route
          path="/reporte_marcas_incompletas"
          element={<Reporte_Marcas_Incompletas />}
        />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

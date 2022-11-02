
import React from 'react'
import './App.css'
import TaskList from './components/menu_user_comp/menu_index'
import Modificar from './components/modificar_empl/modificar_index'
import FormularioEmpleado from './components/FormularioEmpleado/FormularioEmpleado'
import Reporte_Asistencia_Tardia from './components/Reportes/Reporte_EntradasTardes'
import Reporte_Asistencia from './components/Reportes/Reporte_Asistencias'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import AsignarSupervisor from './components/AsignarSupervisor/AsignarSupervisor'
import Informacion from './components/InformacionEmpleados/InformacionEmpleados'
import MenuUsuario from './components/MenuUsuario'
import { useAuth0 } from '@auth0/auth0-react'
import BotonHome from './components/BotonHome'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DarBajaAlta from './components/DarBajaAlta/DarBajaAlta'

function App() {
  const onButtonClickHandler = () => {
    window.alert('Cerrando Sesión')
  }

  return (
    <BrowserRouter>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path='/menu_principal' element={<TaskList />} />
        <Route path='/crear_empleado' element={<FormularioEmpleado />} />
        <Route path='/modificar_empleado' element={<Modificar />} />
        <Route path='/dar_baja_alta' element={<DarBajaAlta />} />
        <Route path='/asignar_supervisor' element={<AsignarSupervisor />} />
        <Route path='/informacion_empleado' element={<Informacion />} />
        <Route
          path='/reporte_entradas_tardes'
          element={<Reporte_Asistencia_Tardia />}
        />
        <Route
          path='/reporte_asistencias'
          element={<Reporte_Asistencia />}
        />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
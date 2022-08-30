import React from 'react';
import './modificar.css';
import Caja from '../CajaTitulo';
import BotonH from '../BotonHome';
import User from '../MenuUsuario';


function Modificar() {

  return (
    <div>
        <Caja input='Modificar Empleado'></Caja>
        <User  input='Andrea Rodriguez'/>
        <BotonH/>
        <div className="vent">
        
        </div>
    </div>
  );
}

export default Modificar;
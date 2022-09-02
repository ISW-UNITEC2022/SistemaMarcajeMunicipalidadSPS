import React from 'react';
import './modificar.css';
import Caja from '../CajaTitulo';
import BotonH from '../BotonHome';
import User from '../MenuUsuario';

function Modificar() {

  return (
    <div>

		<User input={"Andrea Rodriguez"}></User>
		<Caja input={"Crear Empleados"} />
		<BotonH></BotonH>
						
        <div className="vent">
        <div className='asterisco'>*</div>
						<p className='advertencia'>
							Favor rellenar todas las casillas. 
							Cada campo es obligatorio y fundamental 
							para la información de los colaboradores.
							Favor utilizar un correo electrónico ya 
							existente por empleado</p>
        </div>
    </div>
  );
}

export default Modificar;
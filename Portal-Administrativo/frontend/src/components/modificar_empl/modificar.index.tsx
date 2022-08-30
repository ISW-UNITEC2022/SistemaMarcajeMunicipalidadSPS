import React from 'react';
import './modificar.css';
import Caja from '../CajaTitulo';
import BotonH from '../BotonHome';
import User from '../MenuUsuario';
import HomeIcon from '@mui/icons-material/Home';

function Modificar() {

  return (
    <div>
        <div className='SupApp'>
					<div style={{ flex: 3 }}>
						<User input={"Andrea Rodriguez"}></User>
					</div>
					<div style={{ flex: 3 }}>
						<Caja input={"Crear Empleados"} />
					</div>
					<div style={{ flex: 3 }}>
						<BotonH><HomeIcon/></BotonH>
					</div>
				</div>
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
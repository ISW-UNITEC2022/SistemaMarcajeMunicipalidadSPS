import {useState, useEffect} from 'react'
import './Estilos/FormularioEmpleado.css'
import BarraSuperior from '../BarraSuperior';
import BarraInferior from '../BarraInferior';
import BotonHome from '../BotonHome';
import BotonV from '../BotonV';
import CajaTitulo from '../CajaTitulo';
import MenuUsuario from '../MenuUsuario';
import TextBox from './Botones/TextBox';
import PasswordBox from './Botones/PasswordBox';
import DropdownBox from './Botones/DropdownBox';
import { Box, Grid } from '@mui/material';

export default  function FormularioEmpleado() {

	const [empleado, setEmpleado] = useState({
		idempleado: '', 
  		idsupervisor: '',
  		nombre: '',
  		apellido: '',
  		correo: '',
  		password: '',
		confpassword: '',
  		distrito: 0,
  		departamento: '',
  		horaentrada: { hora: 0, tiempo: ''},
  		horasalida: { hora: 0, tiempo: '' },
	  });

	const handleChange = (e) => {
		setEmpleado({
		  ...empleado,
		  [e.target.name]: e.target.value,
		});
	  };
	
	  let { idempleado,idsupervisor,nombre,apellido,correo,password,confpassword,distrito,departamento,horaentrada,horasalida } = empleado;
	  const delay = ms => new Promise(res => setTimeout(res, ms));

	  	const handleSubmit=()=>{
			if(idempleado==='' || idsupervisor==='' || nombre==='' || apellido==='' || correo==='' || password==='' && confpassword!=password){
				return console.log('campos vacios');
			}

			const requestInit = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(empleado),
			  };

			fetch('http://localhost:4000/api/empleados/auth',requestInit)
			.then(res=>res.json())
			.then(res=>console.log(res));

			  setEmpleado({
				idempleado: '', 
  				idsupervisor: '',
  				nombre: '',
  				apellido: '',
  				correo: '',
  				password: '',
				confpassword: '',
  				distrito: 0,
  				departamento: '',
  				horaentrada: { hora: 0, tiempo: ''},
  				horasalida: { hora: 0, tiempo: '' },
			  })

		}

	return (
		<div>
			<div className='BackApp'>
				<div className='SupApp'>
					<div style={{ flex: 3 }}>
						<MenuUsuario input={"Andrea Rodriguez"}></MenuUsuario>
					</div>
					<div style={{ flex: 3 }}>
						<CajaTitulo input={"Crear Empleados"} />
					</div>
					<div style={{ flex: 3 }}>
						<Box></Box>
					</div>
				</div>
				<div>
					<BotonHome></BotonHome>
				</div>
				<div className="Content">
					<p className='texto'>Ingrese los datos correspondientes.</p>
					<div className="aaa">
						<TextBox input={"No° Identidad"} width={"61ch"}></TextBox>
					</div>
					<div className="aaa">
						<TextBox input={"Nombres"} width={"30ch"}></TextBox>
						<TextBox input={"Apellidos"} width={"30ch"}></TextBox>
					</div>
					<div className="aaa">
						<TextBox input={"Correo Electrónico"} width={"61ch"}></TextBox>
					</div>
					<div className="aaa">
						<PasswordBox input={"Contraseña"}></PasswordBox>
						<PasswordBox input={"Confirmar Contraseña"}></PasswordBox>
						<div className='asterisco'>*</div>
						<p className='advertencia'>
							Favor rellenar todas las casillas. 
							Cada campo es obligatorio y fundamental 
							para la información de los colaboradores.
							Favor utilizar un correo electrónico ya 
							existente por empleado</p>
					</div>
					<div className="aaa">
						<DropdownBox input={"Hora Entrada"} width={"18.8ch"} type={"hora"}></DropdownBox>
						<DropdownBox input={"Horario"} width={"10ch"} type={"horario"}></DropdownBox>
						<DropdownBox input={"Hora Salida"} width={"18.8ch"} type={"hora"}></DropdownBox>
						<DropdownBox input={"Horario"} width={"10ch"} type={"horario"}></DropdownBox>
					</div>
					<div className="aaa">
						<TextBox input={"Zona"} width={"40ch"}></TextBox>
						<DropdownBox input={"Distritos"} width={"20ch"} type={"distrito"}></DropdownBox>
					</div>
					<div className="aaa">
						<TextBox input={"Departamento"} width={"61ch"}></TextBox>
					</div>
					<form onSubmit={handleSubmit}>
					<div className='aaa'>
						<BotonV input={"Registrar"} width={"47.4ch"} type={""}></BotonV>
					</div>
					</form>
				</div>
			</div>
		</div>
	);
}

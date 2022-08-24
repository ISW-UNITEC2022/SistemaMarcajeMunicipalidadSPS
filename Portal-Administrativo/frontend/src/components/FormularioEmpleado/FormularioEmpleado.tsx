import React from 'react';
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

function FormularioEmpleado() {
	return (
		<div>
			<div className='BackApp'>
				<BarraSuperior></BarraSuperior>
				<div className='SupApp'>
					<div style={{ flex: 3 }}>
						<MenuUsuario></MenuUsuario>
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
						<DropdownBox input={"Hora Entrada"} width={"18.8ch"} type={"hora"} ></DropdownBox>
						<DropdownBox input={"Horario"} width={"10ch"} type={"horario"}></DropdownBox>
						<DropdownBox input={"Hora Salida"} width={"18.8ch"} type={"hora"} ></DropdownBox>
						<DropdownBox input={"Horario"} width={"10ch"} type={"horario"}></DropdownBox>
					</div>
					<div className="aaa">
						<TextBox input={"Zona"} width={"40ch"}></TextBox>
						<DropdownBox input={"Distritos"} width={"20ch"} type={"distrito"}></DropdownBox>
					</div>
					<div className="aaa">
						<TextBox input={"Departamento"} width={"61ch"}></TextBox>
					</div>
					<div className='aaa'>
						<BotonV input={"Registrar"} width={"47.4ch"}></BotonV>
					</div>
				</div>
				<div className='PiedePagina'>
					<BarraInferior></BarraInferior>
				</div>
			</div>
		</div>
	);
}

export default FormularioEmpleado;
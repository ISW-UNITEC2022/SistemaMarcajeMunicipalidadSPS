import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import './modificar.css';
import Caja from '../CajaTitulo';
import User from '../MenuUsuario';
import TextBox from '../TextBox';
import PasswordBox from '../PasswordBox';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from 'axios';
import MenuUsuario from "../MenuUsuario";
import BotonHome from "../BotonHome";

function Modificar() {
	const url = "https://proyecto-isw1.herokuapp.com/api/empleados/rol";
	const [empleados, setEmpleados] = useState([]);
	const [modEmp, setModEmp] = useState("");

	useEffect(() => {
		getEmpleados();
	}, []);

	const getEmpleados = () => {
		axios
			.get(url)
			.then((response) => {
				const empleados = response.data;
				setEmpleados(empleados);
			})
			.catch((error) => console.error(`Error: ${error}`));
	};



	const [data, setData] = useState({
		idempleado: "",
		idsupervisor: null,
		nombre: "",
		apellido: "",
		correo: "",
		password: "",
		distrito: 0,
		zona: "",
		departamento: "",
		horaentrada: "",
		horasalida: "",
	});

	const [dis, setDis] = React.useState("");

	const handleChangeDis = (event: SelectChangeEvent) => {
		console.log(dis);
		setDis(event.target.value);
		console.log(dis);
	};

	const [dep, setDep] = React.useState("");

	const handleChangeDep = (event: SelectChangeEvent) => {
		console.log(dep);
		setDep(event.target.value);
		console.log(dep);
	};

	function refreshPage() {
		window.location.reload();
	}

	function submit(e) {
		e.preventDefault();
		axios.post(url, {
			idempleado: data.idempleado,
			idsupervisor: null,
			nombre: data.nombre,
			apellido: data.apellido,
			correo: data.correo,
			password: data.password,
			distrito: dis,
			zona: data.zona,
			departamento: dep,
			horaentrada: data.horaentrada,
			horasalida: data.horasalida,
		}).then((res) => {
			console.log(res.data);
		});

		setData({
			idempleado: "",
			idsupervisor: null,
			nombre: "",
			apellido: "",
			correo: "",
			password: "",
			distrito: 0,
			zona: "",
			departamento: "",
			horaentrada: "",
			horasalida: "",
		});
		setDis("");
		setDep("");
	}

	function handle(e) {
		const newdata = { ...data };
		newdata[e.target.id] = e.target.value;
		setData(newdata);
		console.log(newdata);
	}

	return (
		<div>
			<div>
				<form onSubmit={(e) => submit(e)}>
					<MenuUsuario></MenuUsuario>
					<BotonHome></BotonHome>
					<div className="fila">
						<select
							name="empleadoss"
							id="empleadoss"
							onChange={handle}
							value={modEmp}
						>
							{empleados.map((emp) => (
								<option value={emp.idempleado}>
									NOMBRE: {emp.nombre} {emp.apellido} | CORREO: {emp.correo}
								</option>
							))}
						</select>

						<button
							style={{
								blockSize: "50px",
								width: "280px",
								height: "45px",
								marginTop: "25px",
								marginLeft: "10px"
							}}
						>
							Seleccionar Empleado
						</button>
					</div>

					<div className="fila">
						<TextBox
							_width={488}
							_onChange={(e) => handle(e)}
							_id={"idempleado"}
							_value={data.idempleado}
							_type={"text"}
							_label={"No° Identidad"}
							_habilitar={true}
							_asterisk={"#969696"}
						></TextBox>
					</div>

					<div className="fila">
						<TextBox
							_width={238}
							_onChange={(e) => handle(e)}
							_id={"nombre"}
							_value={data.nombre}
							_type={"text"}
							_label={"Nombres"}
							_habilitar={true}
							_asterisk={"#969696"}
						></TextBox>

						<TextBox
							_width={238}
							_onChange={(e) => handle(e)}
							_id={"apellido"}
							_value={data.apellido}
							_type={"text"}
							_label={"Apellidos"}
							_habilitar={true}
							_asterisk={"#969696"}
						></TextBox>
					</div>

					<div className="fila">
						<TextBox
							_width={238}
							_onChange={(e) => handle(e)}
							_id={"correo"}
							_value={data.correo}
							_type={"text"}
							_label={"Correo Electrónico"}
							_habilitar={false}
							_asterisk={"red"}
						></TextBox>

						<PasswordBox
							_onChange={(e) => handle(e)}
							_id={"password"}
							_value={data.password}
							_label={"Contraseña"}
						></PasswordBox>
					</div>

					<div className="fila">
						<FormControl sx={{ minWidth: 250, marginLeft: "-12px" }}>
							<InputLabel
								sx={{
									"&.MuiInputLabel-formControl": {
										"&.Mui-focused": {
											color: "#02732A",
										},
										".MuiInputLabel-asterisk": {
											color: "red",
										},
									},
								}}
								required
								id="demo-simple-select-autowidth-label"
							>
								Distrito
							</InputLabel>
							<Select
								required
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={dis}
								onChange={handleChangeDis}
								autoWidth
								label="Distrito"
								variant="outlined"
								sx={{
									marginRight: "12px",
									marginBottom: "5px",
									height: 55,
									size: "large",
									".MuiSelect-icon": {
										color: "#02732A",
									},
									".MuiOutlinedInput-notchedOutline": {
										borderColor: "#02732A",
									},
									"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
										borderColor: "#02732A",
									},
									"&:hover .MuiOutlinedInput-notchedOutline": {
										borderColor: "#02732A",
									},
								}}
							>
								<MenuItem sx={{ width: 120 }} value="" className="MenuItem">
									<em>None</em>
								</MenuItem>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={6}>6</MenuItem>
								<MenuItem value={7}>7</MenuItem>
								<MenuItem value={8}>8</MenuItem>
								<MenuItem value={9}>9</MenuItem>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={11}>11</MenuItem>
								<MenuItem value={12}>12</MenuItem>
								<MenuItem value={13}>13</MenuItem>
								<MenuItem value={14}>14</MenuItem>
								<MenuItem value={15}>15</MenuItem>
								<MenuItem value={16}>16</MenuItem>
								<MenuItem value={17}>17</MenuItem>
								<MenuItem value={18}>18</MenuItem>
								<MenuItem value={19}>19</MenuItem>
								<MenuItem value={20}>20</MenuItem>
							</Select>
						</FormControl>

						<FormControl sx={{ minWidth: 238 }}>
							<InputLabel
								sx={{
									"&.MuiInputLabel-formControl": {
										"&.Mui-focused": {
											color: "#02732A",
										},
										".MuiInputLabel-asterisk": {
											color: "red",
										},
									},
								}}
								required
								id="demo-simple-select-autowidth-label"
							>
								Departamento
							</InputLabel>
							<Select
								required
								labelId="demo-simple-select-autowidth-label"
								id="demo-simple-select-autowidth"
								value={dep}
								onChange={handleChangeDep}
								autoWidth
								label="Departamento"
								variant="outlined"
								sx={{
									height: 55,
									marginBottom: "5px",
									size: "large",
									".MuiSelect-icon": {
										color: "#02732A",
									},
									".MuiOutlinedInput-notchedOutline": {
										borderColor: "#02732A",
									},
									"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
										borderColor: "#02732A",
									},
									"&:hover .MuiOutlinedInput-notchedOutline": {
										borderColor: "#02732A",
									},
								}}
							>
								<MenuItem sx={{ width: 120 }} value="" className="MenuItem">
									<em>None</em>
								</MenuItem>
								<MenuItem value={"C3i"}>Direccion C3i</MenuItem>
								<MenuItem value={"CCC"}>CCC</MenuItem>
								<MenuItem value={"DIEM"}>DIEM</MenuItem>
								<MenuItem value={"MT"}>MT</MenuItem>
								<MenuItem value={"AMC"}>AMC</MenuItem>
							</Select>
						</FormControl>
					</div>

					<div className="fila">
						<TextBox
							_width={488}
							_onChange={(e) => handle(e)}
							_id={"zona"}
							_value={data.zona}
							_type={"text"}
							_label={"Zona"}
							_habilitar={false}
							_asterisk={"red"}
						></TextBox>
					</div>
					<div className="fila">
						<p className="horaText">
							Hora Entrada <span className="_asterisco">*</span>
						</p>
						<p className="horaText">
							Hora Salida <span className="_asterisco">*</span>
						</p>
					</div>
					<div className="fila">
						<input
							onChange={(e) => handle(e)}
							id="horaentrada"
							value={data.horaentrada}
							placeholder="Hora de Entrada"
							type="time"
							required
							className="horaentrada"
						/>

						<input
							onChange={(e) => handle(e)}
							id="horasalida"
							value={data.horasalida}
							placeholder="Hora de Salida"
							type="time"
							required
							className="horasalida"
						/>
					</div>

					<div className="fila">
						<button
							className="btn btn-primary"
							style={{
								width: "488px",
								marginTop: "6px",
								marginLeft: "-12px"
							}}
						>
							Modificar Empleado
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Modificar;
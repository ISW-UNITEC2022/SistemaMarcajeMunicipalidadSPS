import { MenuItem, Select } from "@mui/material";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import Textbox from '../TextBox';
import '../AsignarSupervisor/Estilos/AsignarSupervisor.css';

function FormularioSupervisor() {
	const url = "https://proyecto-isw1.herokuapp.com/api/empleados/rol";
	const url2 = "https://proyecto-isw1.herokuapp.com/api/supervisores";
	const [empleados, setEmpleados] = useState([]);
	const [supervisor, setSupervisor] = useState("");//Guarda el id del empleado supervisor
	const [data, setData] = useState({
		idempleado: "",
		idauth0: "",
	});


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

	function submit(e) {
		console.log(supervisor);
		e.preventDefault();
		axios.post(url2, {
			idempleado: supervisor,
			idauth0: data.idauth0
		}).then((res) => {
			console.log(res.data)
		})
	}

	function handle(e) {
		setSupervisor(e.target.value);
		console.log(supervisor);
	}

	function handleChange(e) {
		const newdata = { ...data };
		newdata[e.target.id] = e.target.value;
		setData(newdata);
		console.log(newdata);
	}

	return (
		<>
			<form onSubmit={submit}>
				<body>
					<div className="Box">
						<div className="Box1">
							<p>Seleccione al empleado al cual desea asignar el rol de supervisor.</p>
						</div>
						<div className="Box2">
							<select
								name="empleadoss"
								id="empleadoss"
								onChange={handle}
								value={supervisor}
							>
								{empleados.map((emp) => (
									<option value={emp.idempleado} key={emp.idempleado}>
										NOMBRE: {emp.nombre} {emp.apellido} | CORREO: {emp.correo}
									</option>
								))}
							</select>
						</div>

						<div className="Box3">
							<p><span className="asterisco">*</span> Para que el superivisor pueda tener acceso al portal,
								se debe registrar en la plataforma auth0, para luego, ingresar el codigo
								de identificación de auth0 del usuario creado.</p>
						</div>

						<div className="Box4">
							<Textbox
								_width={250}
								_onChange={(e) => handleChange(e)}
								_id={"idauth0"}
								_value={data.idauth0}
								_type={"text"}
								_label={"ID de Auth0"} _habilitar={undefined} _asterisk={undefined}							></Textbox>
						</div>

						<div className="Box5">
							<button
								style={{ width: '285px' }}
								type="submit"
								className="btn btn-primary"
							>
								Registrar en Auth0
							</button>
						</div>

						<div className="Box6">
							<button style={{ width: '285px' }}>
								Asignar Supervisor
							</button>
						</div>
					</div>
				</body>

			</form>
			{/*<ul>
        {empleados.map((emp) => (
          <li key={emp.correo}>
            Nombre {emp.nombre} {emp.apellido} Correo:{emp.correo} id{" "}
            {emp.idempleado}
          </li>
        ))}
      </ul>*/}
		</>
	);
}

export default FormularioSupervisor;
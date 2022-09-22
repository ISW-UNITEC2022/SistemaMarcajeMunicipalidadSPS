import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import Textbox from "../TextBox";
import "../DarBajaAlta/DarBajaAlta.css";
import { toast } from "react-toastify";

function FormularioSupervisor() {
  const url = "https://proyecto-isw1.herokuapp.com/api/empleados";
  const url2 = "https://proyecto-isw1.herokuapp.com/api/empleados/status";
  const [empleados, setEmpleados] = useState([
    {
      idempleado: "",
      idsupervisor: "",
      nombre: "",
      apellido: "",
      correo: "",
      departamento: "",
      distrito: 0,
      status: "alta",
      zona: 0,
      horaentrada: "",
      horasalida: "",
      rol: "",
    },
  ]);
  const [empleado, setEmpleado] = useState(""); //Guarda el id del empleado
  const [status, setStatus] = React.useState("baja");

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

  let firstem = empleados[0]?.idempleado;

  function submit(e) {
    e.preventDefault();
    console.log(empleado);
    console.log(status);
    axios.put(url2, {
			idempleado: empleado,
			status: status
		}).then((res) => {
      toast.success("¡Estado de empleado cambiado éxitosamente!");
			console.log(res.data)
		}).catch(error=> {
      toast.error(error.response.data.message);
      console.log(error.response.data.message)
    });
  }

  function handle(e) {
    setEmpleado(e.target.value);
    console.log(empleado);
  }

  function handleChangeStatus(e) {
    setStatus(e.target.value);
    console.log(status);
  }

  return (
    <div className="BoxDBA">
      <form onSubmit={submit}>
        <div className="_filaDBA">
          <p>
            Seleccione el empleado y el status que desea cambiar a dicho
            empleado.
          </p>
        </div>
        <div className="_filaDBA">
          <select
            name="empleadoss"
            id="empleadoss"
            onChange={handle}
            value={empleado}
            defaultValue={firstem}
          >
            <option value="" key="">
                Desplegar empleados
              </option>
            {empleados.map((emp) => (
              <option value={emp.idempleado} key={emp.idempleado}>
                NOMBRE: {emp.nombre} {emp.apellido} | CORREO: {emp.correo}
              </option>
            ))}
          </select>
        </div>
        <div className="_filaDBA">
          <select
            name="statuss"
            id="statuss"
            onChange={handleChangeStatus}
            value={status}
            defaultValue="baja"
          >
            <option value="baja">Dar de Baja</option>
            <option value="alta">Dar de Alta</option>
          </select>
        </div>
        <div className="_filaDBA">
          <button id="botonDBA">Modificar Estado del Empleado</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioSupervisor;

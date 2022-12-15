import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import Textbox from "../Componentes UI/TextBox";
import "../DarBajaAlta/DarBajaAlta.css";
import { toast } from "react-toastify";
import MenuUsuario from "../Componentes UI/MenuUsuario";
import CajaTitulo from "../Componentes UI/CajaTitulo";
import BotonHome from "../Componentes UI/BotonHome";

import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from "react-router-dom";

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
    axios
      .put(url2, {
        idempleado: empleado,
        status: status,
      })
      .then((res) => {
        toast.success("¡Estado de empleado cambiado éxitosamente!");
        console.log(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
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

  const { user, isAuthenticated, isLoading } = useAuth0();

  const usuario_id = () => {
    if (isAuthenticated) return user.sub
    else if (isLoading) return ""
    else return 'Error de Autenticacion'
  }

  const idSuper = usuario_id();


  return (
    (isAuthenticated || idSuper === "")
      ?
      <div>
        <MenuUsuario></MenuUsuario>
        <CajaTitulo _input={"Estado de Empleados"}></CajaTitulo>
        <BotonHome></BotonHome>
        <div className="BoxDBA">
          <form onSubmit={submit}>
            <div className="_filaDBA">
              <p style={{marginTop:"20px"}}>
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
                className="select_DBA"
                onChange={handleChangeStatus}
                value={status}
                defaultValue="baja"
              >
                <option value="baja">Dar de Baja</option>
                <option value="alta">Dar de Alta</option>
              </select>
            </div>
            <div className="_filaDBA">
              <button className="botonDBA">Modificar Estado del Empleado</button>
            </div>
          </form>
        </div>
      </div>
      :
      (idSuper === "Error de Autenticacion")
        ?
        <Navigate to="/" replace={true} />
        :
        <></>
  );
}

export default FormularioSupervisor;

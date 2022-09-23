import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Textbox from "../TextBox";
import "../AsignarSupervisor/Estilos/AsignarSupervisor.css";
import MenuUsuario from "../MenuUsuario";
import BotonHome from "../BotonHome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormularioSupervisor() {
  const url = "https://proyecto-isw1.herokuapp.com/api/empleados/rol";
  const url2 = "https://proyecto-isw1.herokuapp.com/api/supervisores";
  const [empleados, setEmpleados] = useState([]);
  const [supervisor, setSupervisor] = useState(""); //Guarda el id del empleado supervisor
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
    axios
      .post(url2, {
        idempleado: supervisor,
        idauth0: data.idauth0,
      })
      .then((res) => {
        toast.success("¡Supervisor asignado éxitosamente!");
        console.log(res.data);
      })
      .catch((error) => {
        toast.error("Error al asignar supervisor");
        console.log(error.response);
      });

    setData({
      idempleado: "",
      idauth0: "",
    });
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

  const openInNewTab = url => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <>
      <MenuUsuario></MenuUsuario>
      <BotonHome></BotonHome>
      <body>
        <div id="Box_AS">
          <div id="Box1">
            <p>
              Seleccione al empleado al cual desea asignar el rol de
              supervisor.
            </p>
          </div>
          <div id="Box2">
            <select
              name="empleadoss"
              id="empleadoss"
              onChange={handle}
              value={supervisor}
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

          <div id="Box3">
            <p>
              <span id="asterisco">*</span> Para que el superivisor
              pueda tener acceso al portal, se debe registrar en la plataforma
              auth0, para luego, ingresar el codigo de identificación de auth0
              del usuario creado.
            </p>
          </div>

          <div id="Box4">
            <Textbox
              _width={"250px"}
              _onChange={(e) => handleChange(e)}
              _id={"idauth0"}
              _value={data.idauth0}
              _type={"text"}
              _label={"ID de Auth0"}
              _habilitar={undefined}
              _asterisk={"red"}
            ></Textbox>

            <button id="Boton" onClick={() => openInNewTab('https://manage.auth0.com/dashboard/us/dev-am-lc7yg/users')}
              style={{ width: "250px" }}>
              Registrar en Auth0
            </button>
          </div>

          <form onSubmit={submit}>
            <div id="Box5">
              <button id="Boton" style={{ width: "285px" }}>Asignar Supervisor</button>
            </div>
          </form>
        </div>
      </body>

    </>
  );
}

export default FormularioSupervisor;

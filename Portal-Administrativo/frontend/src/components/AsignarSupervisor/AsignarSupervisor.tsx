import { MenuItem, Select } from "@mui/material";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
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

  return (
    <>
      <form onSubmit={submit}>
        <MenuUsuario></MenuUsuario>
        <BotonHome></BotonHome>
        <body>
          <div className="Box">
            <div className="Box1">
              <p>
                Seleccione al empleado al cual desea asignar el rol de
                supervisor.
              </p>
            </div>
            <div className="Box2">
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

            <div className="Box3">
              <p>
                <span className="_asterisco">*</span> Para que el superivisor
                pueda tener acceso al portal, se debe registrar en la plataforma
                auth0, para luego, ingresar el codigo de identificación de auth0
                del usuario creado.
              </p>
            </div>

            <div className="Box4">
              <Textbox
                _width={250}
                _onChange={(e) => handleChange(e)}
                _id={"idauth0"}
                _value={data.idauth0}
                _type={"text"}
                _label={"ID de Auth0"}
                _habilitar={undefined}
                _asterisk={"red"}
              ></Textbox>
            </div>

            <div className="Box6">
              <button style={{ width: "285px" }}>Asignar Supervisor</button>
            </div>
            <div className="Box5">
              <a
                href="https://manage.auth0.com/dashboard/us/dev-am-lc7yg/users"
                target="_blank"
                rel="noreferrer"
              >
                <button style={{ width: "250px" }} className="btn btn-primary">
                  Registrar en Auth0
                </button>
              </a>
            </div>
          </div>
        </body>
      </form>
    </>
  );
}

export default FormularioSupervisor;

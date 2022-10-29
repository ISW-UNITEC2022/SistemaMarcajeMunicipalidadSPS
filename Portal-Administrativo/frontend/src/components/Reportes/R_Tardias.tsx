import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Textbox from "../TextBox";
import "../Reportes/R_Tardias.css";
import MenuUsuario from "../MenuUsuario";
import BotonHome from "../BotonHome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
        <div id="Box_RT">
          <div id="Box1_RT">
            <p>
              <span id="asterisco_RT">*</span> Se generará el reporte de los ingresos deseados el cual podrá ingresar un destinario
              al cual desea que se envíe. El reporte se enviará en formato de PDF.
            </p>
          </div>
          <div id="Box2_RT">
            <p>
              Ingresar destinario (correo electrónico):
            </p>
          </div>

          <div id="Box3_RT">
            <Textbox
              _width={"285px"}
              _onChange={(e) => handleChange(e)}
              _id={"idauth0"}
              _value={data.idauth0}
              _type={"text"}
              _label={"Correo Electrónico"}
              _habilitar={undefined}
              _asterisk={"red"}
            ></Textbox>

            <button id="Boton_RT" 
              /*onClick={() => openInNewTab('https://manage.auth0.com/dashboard/us/dev-am-lc7yg/users')}*/
              style={{ width: "285px" }}>
              Enviar Reporte
            </button>
          </div>

          <div id="Box4_RT">
            <p>
              Estado de envío: {<CheckCircleIcon sx={{ color: "#757575" }}></CheckCircleIcon>}
            </p>
          </div>

          <form onSubmit={submit}>
            <div id="Box5_RT">
              <button id="Boton_RT" style={{ width: "285px" }}>Generar Reporte</button>
            </div>
          </form>
        </div>
      </body>

    </>
  );
}

export default FormularioSupervisor;

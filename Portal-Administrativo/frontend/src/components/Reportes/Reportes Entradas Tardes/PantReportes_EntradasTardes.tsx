import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import Textbox from "../../Componentes UI/TextBox";
import "./PantReportes_EntradasTardes.css";
import MenuUsuario from '../../Componentes UI/MenuUsuario'
import BotonHome from "../../Componentes UI/BotonHome";
import CajaTitulo from "../../Componentes UI/CajaTitulo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function FormularioSupervisor() {
  const navigate = useNavigate();

  const navigateToReportes = () => {
    navigate('/reporte_entradas_tardes');
  };
  const [data, setData] = useState({
    idempleado: "",
    idauth0: "",
  });

  function handleChange(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
    <>
      <MenuUsuario></MenuUsuario>
      <BotonHome></BotonHome>
      <CajaTitulo input={"Reporte Entradas Tardías"}></CajaTitulo>
      <body>
        <div id="Box_RT">
          <div id="Box1_RT">
            <p>
              <span id="asterisco_RT">*</span> Se generará el reporte de entradas tardes de los empleados. Ingresar el correo electrónico al cuál desee enviar el reporte. El reporte se enviará en formato de PDF.
            </p>
          </div>
          <div id="Box2_RT">
            <p>
              Ingresar destinatario (correo electrónico):
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
              style={{ width: "285px" }}>
              Enviar Reporte
            </button>
          </div>

          <div id="Box4_RT">
            <p>
              Estado de envío: {<CheckCircleIcon sx={{ color: "#757575" }}></CheckCircleIcon>}
            </p>
          </div>

            <div id="Box5_RT">
              <button id="Boton_RT" style={{ width: "285px" }} onClick={navigateToReportes}>Generar Reporte</button>
            </div>
        
        </div>
      </body>

    </>
  );
}

export default FormularioSupervisor;
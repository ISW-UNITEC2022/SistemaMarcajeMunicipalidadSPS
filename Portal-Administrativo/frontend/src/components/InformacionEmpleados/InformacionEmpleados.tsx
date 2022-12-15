import React, { useState, useEffect } from "react";
import "../InformacionEmpleados/InformacionEmpleados.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import MenuUsuario from "../Componentes UI/MenuUsuario";
import CajaTitulo from "../Componentes UI/CajaTitulo";
import BotonHome from "../Componentes UI/BotonHome";

export default function FormularioBasico() {
  const url = "https://proyecto-isw1.herokuapp.com/api/empleados";
  const url2 = 'https://proyecto-isw1.herokuapp.com/api/supervisores/';
  const [empleados, setEmpleados] = useState([]);
  const [dataSupervisor, setDataSupervisor] = useState({
    idempleado: '',
  })

  const { user, isAuthenticated, isLoading } = useAuth0();

  const usuario_id = () => {
    if (isAuthenticated) return user.sub
    else if (isLoading) return ""
    else return 'Error de Autenticacion'
  }

  const idSuper = usuario_id();

  useEffect(() => {
    getEmpleados();
    getSupervisor();
  }, [idSuper, dataSupervisor.idempleado]);

  const getSupervisor = () => {
    console.log('El id auth0 ' + idSuper)
    Axios
      .get(url2 + idSuper)
      .then((response: any) => {
        const info = response.data
        setDataSupervisor(info)
      })
      .catch((err: any) => console.log(err))
  }

  const getEmpleados = () => {
    console.log('El id de emp es: ' + dataSupervisor.idempleado);
    let _url = "";
    let _id = dataSupervisor.idempleado;

    if (idSuper === "auth0|62f3ecea26ef957bf8d3b45d") {
      _url = url;
    }
    else {
      _url = url2 + _id + "/empleados";
    }

    Axios
      .get(_url)
      .then((response) => {
        const empleados = response.data;
        setEmpleados(empleados);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };


  return (
    (isAuthenticated || idSuper === "")
      ?
      <div>
        <MenuUsuario></MenuUsuario>
        <CajaTitulo _input={"Información de Empleados"}></CajaTitulo>
        <BotonHome></BotonHome>

        
        <div 
          style={{marginTop: "20px"}}
          className="_filaInfo">
          <div className="_tableBox">
            <Table
              responsive
              className="table table-sm"
              style={{
                borderRadius: "10px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      color: "#757575",
                    }}
                  >
                    #
                  </th>
                  <th
                    style={{
                      borderLeft: "1px solid #969696",
                    }}
                  >
                    No° Identidad
                  </th>
                  <th
                    style={{
                      borderLeft: "1px solid #969696",
                    }}
                  >
                    Nombre Completo
                  </th>
                  <th
                    style={{
                      borderLeft: "1px solid #969696",
                    }}
                  >
                    Correo
                  </th>
                  <th
                    style={{
                      borderLeft: "1px solid #969696",
                    }}
                  >
                    Distrito
                  </th>
                  <th
                    style={{
                      borderLeft: "1px solid #969696",
                    }}
                  >
                    Estado Empleado
                  </th>
                  <th
                    style={{
                      borderLeft: "1px solid #969696",
                    }}
                  >
                    Hora Entrada
                  </th>
                  <th
                    style={{
                      borderLeft: "1px solid #969696",
                    }}
                  >
                    Hora Salida
                  </th>
                  <th
                    style={{
                      borderLeft: "1px solid #969696",
                    }}
                  >
                    Zona
                  </th>
                  <th
                    style={{
                      borderLeft: "1px solid #969696",
                    }}
                  >
                    Departamento
                  </th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((emp) => (
                  <tr key={emp.idempleado}>
                    <td
                      style={{
                        color: "#757575",
                        fontWeight: "bold",
                      }}
                    >
                      {empleados.indexOf(emp) + 1}
                    </td>

                    <td
                      style={{
                        borderLeft: "1px solid #969696",
                      }}
                    >
                      {emp.idempleado}
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid #969696",
                      }}
                    >
                      {emp.nombre} {emp.apellido}
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid #969696",
                      }}
                    >
                      {emp.correo}
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid #969696",
                      }}
                    >
                      {emp.distrito}
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid #969696",
                      }}
                    >
                      {emp.status}
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid #969696",
                      }}
                    >
                      {emp.horaentrada}
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid #969696",
                      }}
                    >
                      {emp.horasalida}
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid #969696",
                      }}
                    >
                      {emp.zona}
                    </td>
                    <td
                      style={{
                        borderLeft: "1px solid #969696",
                      }}
                    >
                      {emp.departamento}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
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

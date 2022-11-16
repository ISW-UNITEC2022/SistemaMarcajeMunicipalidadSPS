import React, { useState, useEffect } from "react";
import "../InformacionEmpleados/InformacionEmpleados.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import MenuUsuario from "../MenuUsuario";
import BotonHome from "../Componentes UI/BotonHome";

export default function FormularioBasico() {
  const url = "https://proyecto-isw1.herokuapp.com/api/empleados";
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    getEmpleados();
  }, []);

  const getEmpleados = () => {
    Axios.get(url)
      .then((response) => {
        const empleados = response.data;
        setEmpleados(empleados);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  return (
    <div>
      <MenuUsuario></MenuUsuario>
      <BotonHome></BotonHome>
      <div className="_filaInfo">
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
  );
}

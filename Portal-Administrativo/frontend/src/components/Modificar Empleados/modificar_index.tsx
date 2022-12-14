import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./modificar.css";
import TextBox from "../Modificar Empleados/MTextBox";
import PasswordBox from "../Modificar Empleados/MPasswordBox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import BotonHome from "../Componentes UI/BotonHome";
import MenuUsuario from "../Componentes UI/MenuUsuario";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InferencePriority } from "typescript";
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from "react-router-dom";


function Modificar() {
  const url = "https://proyecto-isw1.herokuapp.com/api/empleados";
  const url2 = "https://proyecto-isw1.herokuapp.com/api/empleados/";
  const [empleados, setEmpleados] = useState([]);
  const [idEmpleado, setIdEmpleado] = useState("");

  //InfoEmpleado tiene toda la información del empleado seleccionado
  const [infoEmpleado, setInfoEmpleado] = useState({
    idempleado: "",
    idsupervisor: null,
    nombre: "",
    apellido: "",
    correo: "",
    departamento: "",
    distrito: 0,
    status: "",
    horaentrada: "",
    horasalida: "",
    rol: "",
    zona: "",
  });

  useEffect(() => {
    getEmpleados();
    getEmpleados2();
  }, [idEmpleado]);

  const getEmpleados = () => {
    axios
      .get(url)
      .then((response) => {
        const empleados = response.data;
        setEmpleados(empleados);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getEmpleados2 = () => {
    axios
      .get(url2 + idEmpleado)
      .then((response) => {
        const info = response.data;
        setInfoEmpleado(info);
      })
      .catch((error) => console.error(`Error: ${error}`));

    setDep(infoEmpleado.departamento);
    setDis(infoEmpleado.distrito + "");
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

  const [pass, setPass] = React.useState("");

  const handleChangePass = (event: SelectChangeEvent) => {
    console.log(pass);
    setPass(event.target.value);
    console.log(pass);
  };

  function refreshPage() {
    window.location.reload();
  }

  function submit(e) {
    e.preventDefault();
    axios
      .put(url, {
        idempleado: infoEmpleado.idempleado,
        idsupervisor: null,
        correo: infoEmpleado.correo,
        password: pass,
        distrito: dis,
        departamento: dep,
        zona: infoEmpleado.zona,
        horaentrada: infoEmpleado.horaentrada,
        horasalida: infoEmpleado.horasalida,
      })
      .then((res) => {
        toast.success("¡Empleado modificado éxitosamente!");
        console.log(res.data);
      }).catch((error) => {
        toast.error("Error al modificar empleado");
        console.log(error.response);
      });

    setData({
      idempleado: "",
      idsupervisor: "",
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
    setPass("");
  }

  function handle(e) {
    const newdata = { ...infoEmpleado };
    newdata[e.target.id] = e.target.value;
    setInfoEmpleado(newdata);
    console.log(newdata);
  }

  function handleSelect(e) {
    setIdEmpleado(e.target.value);
    console.log(idEmpleado);
  }

  function print() {
    getEmpleados2();
    setData({
      idempleado: infoEmpleado.idempleado,
      idsupervisor: null,
      nombre: infoEmpleado.nombre,
      apellido: infoEmpleado.apellido,
      correo: infoEmpleado.correo,
      password: "",
      distrito: infoEmpleado.distrito,
      zona: infoEmpleado.zona,
      departamento: infoEmpleado.departamento,
      horaentrada: infoEmpleado.horaentrada,
      horasalida: infoEmpleado.horasalida,
    });
    //setDep(infoEmpleado.departamento);
    //setDis(infoEmpleado.distrito + "");
    setPass("");
    console.log(infoEmpleado.correo);
  }

  function desplegarInfo() {
    print();
    setDep(infoEmpleado.departamento);
    setDis(infoEmpleado.distrito + "");
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
      <body id="body">
        <div>
          <form onSubmit={(e) => submit(e)}>
            <MenuUsuario></MenuUsuario>
            <BotonHome></BotonHome>
            <div id="cabeza">
              <select
                name="empleadoss"
                id="empleadoss"
                onChange={handleSelect}
                value={idEmpleado}
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

              <button
                onClick={() => desplegarInfo()}
                id="button"
                style={{
                  width: "280px",
                  height: "55px",
                  marginLeft: "10px",
                }}
              >
                Seleccionar Empleado
              </button>
            </div>

            <div id="fila">
              <TextBox
                _width={488}
                _onChange={(e) => handle(e)}
                _id={"idempleado"}
                _value={infoEmpleado.idempleado}
                _type={"text"}
                _label={"No° Identidad"}
                _habilitar={true}
                _asterisk={"#969696"}
              ></TextBox>
            </div>

            <div id="fila">
              <TextBox
                _width={238}
                _onChange={(e) => handle(e)}
                _id={"nombre"}
                _value={infoEmpleado.nombre}
                _type={"text"}
                _label={"Nombres"}
                _habilitar={true}
                _asterisk={"#969696"}
              ></TextBox>

              <TextBox
                _width={238}
                _onChange={(e) => handle(e)}
                _id={"apellido"}
                _value={infoEmpleado.apellido}
                _type={"text"}
                _label={"Apellidos"}
                _habilitar={true}
                _asterisk={"#969696"}
              ></TextBox>
            </div>

            <div id="fila">
              <TextBox
                _width={238}
                _onChange={(e) => handle(e)}
                _id={"correo"}
                _value={infoEmpleado.correo}
                _type={"text"}
                _label={"Correo Electrónico"}
                _habilitar={false}
                _asterisk={"red"}
              ></TextBox>

              <PasswordBox
                _onChange={(e) => handleChangePass(e)}
                _id={"password"}
                _value={pass}
                _label={"Contraseña"}
              ></PasswordBox>
            </div>

            <div id="fila">
              <FormControl sx={{ minWidth: 250, marginLeft: "-12px" }}>
                <InputLabel
                  sx={{
                    "&.MuiInputLabel-formControl": {
                      "&.Mui-focused": {
                        color: "#02732A",
                      },
                    },
                  }}
                  id="demo-simple-select-autowidth-label"
                >
                  Distrito:  {infoEmpleado.distrito}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={dis}
                  onChange={handleChangeDis}
                  autoWidth
                  label="Distrito___"
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
                    },
                  }}
                  id="demo-simple-select-autowidth-label"
                >
                  Departamento: {infoEmpleado.departamento}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={dep}
                  onChange={handleChangeDep}
                  autoWidth
                  label="Departamento_______"
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

            <div id="fila">
              <TextBox
                _width={488}
                _onChange={(e) => handle(e)}
                _id={"zona"}
                _value={infoEmpleado.zona}
                _type={"text"}
                _label={"Zona"}
                _habilitar={false}
                _asterisk={"red"}
              ></TextBox>
            </div>
            <div className="grid-container">
              <p className="grid-item">
                Hora Entrada {infoEmpleado.horaentrada}
              </p>
              <p className="grid-item">
                Hora Salida {infoEmpleado.horasalida}
              </p>
            </div>
            <div id="fila" style={{ marginBottom: "20px" }}>

            </div>
            <div id="fila">
              <input
                onChange={(e) => handle(e)}
                id="horaentrada"
                value={infoEmpleado.horaentrada}
                placeholder="Hora de Entrada"
                type="time"
                className="horaentrada"
              />

              <input
                onChange={(e) => handle(e)}
                id="horasalida"
                value={infoEmpleado.horasalida}
                placeholder="Hora de Salida"
                type="time"
                className="horasalida"
              />
            </div>

            <div id="fila">
              <button
                id="button"
                className="btn btn-primary"
                style={{
                  width: "488px",
                  height: "55px",
                  marginLeft: "-10px"
                }}
              >
                Modificar Empleado
              </button>
            </div>
          </form>
        </div>
      </body>
      :
      (idSuper === "Error de Autenticacion")
        ?
        <Navigate to="/" replace={true} />
        :
        <></>
  );
}

export default Modificar;
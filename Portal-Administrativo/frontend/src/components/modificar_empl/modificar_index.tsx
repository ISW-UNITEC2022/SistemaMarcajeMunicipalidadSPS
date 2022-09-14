import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./modificar.css";
import Caja from "../CajaTitulo";
import User from "../MenuUsuario";
import TextBox from "../TextBox";
import PasswordBox from "../PasswordBox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import BotonHome from "../BotonHome";

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

  const getEmpleados2 = () => {
    axios
      .get(url2+idEmpleado)
      .then((response) => {
        const info = response.data;
        setInfoEmpleado(info);
      })
      .catch((error) => console.error(`Error: ${error}`));
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

  function refreshPage() {
    window.location.reload();
  }

  function submit(e) {
    e.preventDefault();
    axios
      .put(url, {
        idempleado: infoEmpleado.idempleado,
        correo:data.correo
      })
      .then((res) => {
        console.log(res.data);
      });

    setData({
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
    setDis("");
    setDep("");
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
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
		correo: "",
		password: "",
		distrito: 0,
		zona: "",
		departamento: "",
		horaentrada: "",
		horasalida: "",
	  });
    console.log(infoEmpleado.correo);
  }

  return (
    <div>
      <div>
        <form onSubmit={(e) => submit(e)}>
          <div className="fila">
            <select
              name="empleadoss"
              id="empleadoss"
              onChange={handleSelect}
              value={idEmpleado}
            >
              {empleados.map((emp) => (
                <option value={emp.idempleado} key={emp.idempleado}>
                  NOMBRE: {emp.nombre} {emp.apellido} | CORREO: {emp.correo}
                </option>
              ))}
            </select>

            <button
              onClick={() => print()}
              style={{
                blockSize: "50px",
                width: "280px",
                height: "45px",
                marginTop: "25px",
                marginLeft: "10px",
              }}
            >
              Seleccionar Empleado
            </button>
          </div>

          <div className="fila">
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

          <div className="fila">
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

          <div className="fila">
            <TextBox
              _width={238}
              _onChange={(e) => handle(e)}
              _id={"correo"}
              _value={data.correo}
              _type={"text"}
              _label={"Correo Electrónico"}
              _habilitar={false}
              _asterisk={"red"}
            ></TextBox>

            <PasswordBox
              _onChange={(e) => handle(e)}
              _id={"password"}
              _value={data.password}
              _label={"Contraseña"}
            ></PasswordBox>
          </div>

          <div className="fila">
            <FormControl sx={{ minWidth: 250, marginLeft: "-12px" }}>
              <InputLabel
                sx={{
                  "&.MuiInputLabel-formControl": {
                    "&.Mui-focused": {
                      color: "#02732A",
                    },
                    ".MuiInputLabel-asterisk": {
                      color: "red",
                    },
                  },
                }}
                required
                id="demo-simple-select-autowidth-label"
              >
                Distrito
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={dis}
                onChange={handleChangeDis}
                autoWidth
                label="Distrito"
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
                    ".MuiInputLabel-asterisk": {
                      color: "red",
                    },
                  },
                }}
                required
                id="demo-simple-select-autowidth-label"
              >
                Departamento
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={dep}
                onChange={handleChangeDep}
                autoWidth
                label="Departamento"
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

          <div className="fila">
            <TextBox
              _width={488}
              _onChange={(e) => handle(e)}
              _id={"zona"}
              _value={data.zona}
              _type={"text"}
              _label={"Zona"}
              _habilitar={false}
              _asterisk={"red"}
            ></TextBox>
          </div>
          <div className="fila">
            <p className="horaText">
              Hora Entrada <span className="_asterisco">*</span>
            </p>
            <p className="horaText">
              Hora Salida <span className="_asterisco">*</span>
            </p>
          </div>
          <div className="fila">
            <input
              onChange={(e) => handle(e)}
              id="horaentrada"
              value={data.horaentrada}
              placeholder="Hora de Entrada"
              type="time"
              required
              className="horaentrada"
            />

            <input
              onChange={(e) => handle(e)}
              id="horasalida"
              value={data.horasalida}
              placeholder="Hora de Salida"
              type="time"
              required
              className="horasalida"
            />
          </div>

          <div className="fila">
            <button
              className="btn btn-primary"
              style={{
                width: "488px",
                marginTop: "6px",
                marginLeft: "-12px",
              }}
            >
              Modificar Empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modificar;

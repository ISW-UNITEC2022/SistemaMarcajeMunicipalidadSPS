import React, { useState, useEffect } from "react";
import "./Estilos/FormularioEmpleado.css";
import TextBox from "../TextBox.jsx";
import PasswordBox from "./Botones/PasswordBox.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Axios from "axios";
import { borderColor, fontSize } from "@mui/system";
import { useAuth0 } from '@auth0/auth0-react'


export default function FormularioBasico() {
  const url = "https://proyecto-isw1.herokuapp.com/api/empleados";
  const [idAuth0, SetidAuth0] = React.useState("");
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
  const { user, isAuthenticated } = useAuth0();

  function getAuth0Id(){
    if(isAuthenticated)
      SetidAuth0(user.sub);
    else
    SetidAuth0("");;
  }

  function submit(e) {
    e.preventDefault();
    getAuth0Id();
    console.log("El id del supervisor es "+idAuth0);
 Axios.post(url, {
      idempleado: data.idempleado,
      idsupervisor: null,
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      password: data.password,
      distrito: dis,
      zona: data.zona,
      departamento: dep,
      horaentrada: data.horaentrada,
      horasalida: data.horasalida,
    }).then((res) => {
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

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <div className="fila">
          <p className="instruccion">
            Ingrese los datos correspondientes a las siguientes casillas.
          </p>
        </div>

        <div className="fila">
          <TextBox
            _width={470}
            _onChange={(e) => handle(e)}
            _id={"idempleado"}
            _value={data.idempleado}
            _type={"text"}
            _label={"No° Identidad"}
          ></TextBox>
        </div>

        <div className="fila">
          <TextBox
            _width={220}
            _onChange={(e) => handle(e)}
            _id={"nombre"}
            _value={data.nombre}
            _type={"text"}
            _label={"Nombres"}
          ></TextBox>

          <TextBox
            _width={220}
            _onChange={(e) => handle(e)}
            _id={"apellido"}
            _value={data.apellido}
            _type={"text"}
            _label={"Apellidos"}
          ></TextBox>
        </div>

        <div className="fila">
          <TextBox
            _width={220}
            _onChange={(e) => handle(e)}
            _id={"correo"}
            _value={data.correo}
            _type={"text"}
            _label={"Correo Electrónico"}
          ></TextBox>

          <PasswordBox
            _onChange={(e) => handle(e)}
            _id={"password"}
            _value={data.password}
            _label={"Contraseña"}
          ></PasswordBox>
        </div>

        <div className="fila">
          <FormControl sx={{ minWidth: 250 }}>
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
                height: 52,
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
                height: 52,
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
            _width={470}
            _onChange={(e) => handle(e)}
            _id={"zona"}
            _value={data.zona}
            _type={"text"}
            _label={"Zona"}
          ></TextBox>
        </div>
        <div className="fila">
          <p className="horaText">
            Hora Entrada <span className="asterisco">*</span>
          </p>
          <p className="horaText">
            Hora Salida <span className="asterisco">*</span>
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
            type="submit"
            className="btn btn-primary"
            style={{
              blockSize: "50px",
              width: "484px",
              marginTop: "6px",
            }}
          >
            Crear Empleado
          </button>
        </div>
      </form>
    </div>
  );
}
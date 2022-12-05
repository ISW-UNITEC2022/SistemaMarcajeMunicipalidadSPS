import { useEffect, useState } from 'react'
import MenuUsuario from '../../Componentes UI/MenuUsuario'
import BotonHome from '../../Componentes UI/BotonHome'
import Logo from '../../logo.png'
import DataTable from 'react-data-table-component'
import '../Reportes Entradas Tardes/PantReportes_EntradasTardes.css'
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios'
import { Button } from '@mui/material'
import { Reporte_AsistenciaT_D } from './Reporte_EntradasTardes_D'
import { pdf } from "@react-pdf/renderer";
import { saveAs } from 'file-saver';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Reporte_Asistencia_Tardia() {
  const url = "https://proyecto-isw-dev.herokuapp.com/api/reportes/disponibles";
  const url_emails = "https://proyecto-isw-dev.herokuapp.com/api/reportes/correo";

  const [Tasks, setTasks] = useState([])
  const [dataT, setdataT] = useState([])
  const [correo, setCorreo] = useState([]);

  const [mesI, setMesI] = useState("");
  const [mesF, setMesF] = useState("");

  const [añoI, setAñoI] = useState("");
  const [añoF, setAñoF] = useState("");
  const [años, setAños] = useState([
    {
      fecha: 0,
    }
  ]);

  let firstem = años[0]?.fecha;

  useEffect(() => {
    getAños();
  }, []);

  const getAños = () => {
    axios
      .get(url)
      .then((response) => {
        const años = response.data;
        setAños(años);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const loadTasks = async (mI, mF, yearI, yearF) => {

    if (mI.length === 0) {
      mI = 'Enero';
      setMesI(mI);
    }

    if (mF.length === 0) {
      mF = 'Enero';
      setMesF(mF);
    }

    const response = await fetch(
      'https://proyecto-isw-dev.herokuapp.com/api/reportes/tarde', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "mesInicial": {
          "month": getMes(mI),
          "year": 2022
        },
        "mesFinal": {
          "month": getMes(mF),
          "year": 2022
        }
      }),
    }
    )
    const data1 = await response.json()
    setTasks(data1)

    let data = []

    for (let i = 0; i < data1.length; i++) {
      data[i] = {
        counter: i + 1,
        idempleado: data1[i].idempleado,
        nombre: data1[i].nombre + ' ' + data1[i].apellido,
        departamento: data1[i].departamento,
        distrito: data1[i].distrito,
        fecha: data1[i].fecha,
        latitud: data1[i].latitud,
        longitud: data1[i].longitud,
        hora_asignada: data1[i].hora_asignada,
        hora_entrada: data1[i].hora_entrada,
      }
    }
    setdataT(data);
  }

  function selectFile(contentType, multiple) {
    return new Promise(resolve => {
      let input = document.createElement('input');
      input.type = 'file';
      input.multiple = multiple;
      input.accept = contentType;

      input.onchange = _ => {
        let files = Array.from(input.files);
        if (multiple)
          resolve(files);
        else
          resolve(files[0]);
      };

      input.click();
    });
  }

  async function send_email(e) {

    let mesIn=mesI;
    let mesFin=mesF;
    if(!mesI){
      setMesI('Enero')
      mesIn='Enero';
    }

    if(!mesF){
      setMesF('Enero')
      mesFin='Enero';
    }
    e.preventDefault();

    axios
      .post(url_emails, {
        user: correo,
        cc: "",
        subject: "REPORTE DE ASISTENCIAS TARDIAS",
        message: window.location.href+"_pdf?"+getMes(mesIn)+"&"+getMes(mesFin),
        attachment_content: '1111'
      })
      .then((res) => {
        toast.success("¡REPORTE DE ASISTENCIAS ENVIADO CON EXITO!");
        console.log(res.data);
      })
      .catch((error) => {
        toast.error("ERROR AL ENVIAR EL CORREO");
        console.log(error.response);
      });
  }


  useEffect(() => {
    loadTasks('Enero', 'Enero', 2022, 2022)
  }, [])

  const columns = [
    {
      name: '#',
      selector: (row: any) => row.counter,
    },
    {
      name: 'No° Identidad',
      selector: (row: any) => row.idempleado,
    },
    {
      name: 'Nombre Completo',
      selector: (row: any) => row.nombre,
    },
    {
      name: 'Departamento',
      selector: (row: any) => row.departamento,
    },
    {
      name: 'Distrito',
      selector: (row: any) => row.distrito,
    },
    {
      name: 'Fecha',
      selector: (row: any) => row.fecha,
    },
    {
      name: 'Latitud',
      selector: (row: any) => row.latitud,
    },
    {
      name: 'Longitud',
      selector: (row: any) => row.longitud,
    },
    {
      name: 'Hora Asignada',
      selector: (row: any) => row.hora_asignada,
    },
    {
      name: 'Hora entrada',
      selector: (row: any) => row.hora_entrada,
    },
  ]


  const getMes = (mes) => {
    switch (mes) {
      case 'Enero':
        return 1;
      case 'Febrero':
        return 2;
      case 'Marzo':
        return 3;
      case 'Abril':
        return 4;
      case 'Mayo':
        return 5;
      case 'Junio':
        return 6;
      case 8:
        return 7;
      case 'Agosto':
        return 8;
      case 'Septiembre':
        return 9;
      case 'Octubre':
        return 10;
      case 'Noviembre':
        return 11;
      case 'Diciembre':
        return 12;
    }
  }

  const generarD = () => {

    let dataT = [];
    dataT[0] = [
      'No° Identidad',
      'Nombre Completo',
      'Departamento',
      'Distrito',
      'Fecha',
      'Hora Asignada',
      'Hora entrada',
      'Latitud',
      'Longitud',
    ]

    for (let i = 1; i <= Tasks.length; i++) {
      dataT[i] = [
        Tasks[i - 1].idempleado,
        Tasks[i - 1].nombre + ' ' + Tasks[i - 1].apellido,
        Tasks[i - 1].departamento,
        Tasks[i - 1].distrito,
        Tasks[i - 1].fecha,
        Tasks[i - 1].hora_asignada,
        Tasks[i - 1].hora_entrada,
        Tasks[i - 1].latitud,
        Tasks[i - 1].longitud,
      ]
    }

    return dataT;
  }


  const downloadR = () => {
    let data = generarD();
    pdf(
      <Reporte_AsistenciaT_D mesI={getMes(mesI)} mesF={getMes(mesF)} dataT={data}></Reporte_AsistenciaT_D>
    ).toBlob().then(blob => saveAs(blob, 'Reporte_Entradas_Tardias.pdf'))
  }


  function handleAñoI(e) {
    setAñoI(e.target.value);
  }

  function handleAñoF(e) {
    setAñoF(e.target.value);
  }

  function handleMesI(e) {
    setMesI(e.target.value);
  }

  function handleMesF(e) {
    setMesF(e.target.value);
  }

  function handleCorreo(e) {
    setCorreo(e.target.value);
  }

  function buscarFecha() {
    loadTasks(mesI, mesF, añoI, añoF);
  }

  return (
    <div>
      <MenuUsuario></MenuUsuario>
      <BotonHome></BotonHome>
      <div>
        <img
          src={Logo}
          style={{ height: '10vw', width: 'auto', marginLeft: '4vw' }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3>Dirección C3i Municipalidad de San Pedro Sula</h3>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h5>Formato de Reportes de Tardias</h5>
      </div>

      <button onClick={downloadR} id='button_RT'
        style={{
          marginLeft: "83vw",
          marginTop: "20px",
          marginBottom: "20px"
        }}
      >
        <span>
          <DownloadIcon
            style={{
              fontSize: "22px"
            }}
          ></DownloadIcon>
        </span>

        Descargar
      </button>

      <div id='grid_RT'>
        <div id='item_RT'>
          <p>Seleccionar rango de fecha del reporte:</p>
          <select
            id='select_M_RT'
            onChange={handleMesI}
            value={mesI}
          >
            <option value={"Enero"}>Enero</option>
            <option value={"Febrero"}>Febrero</option>
            <option value={"Marzo"}>Marzo</option>
            <option value={"Abril"}>Abril</option>
            <option value={"Mayo"}>Mayo</option>
            <option value={"Junio"}>Junio</option>
            <option value={"Julio"}>Julio</option>
            <option value={"Agosto"}>Agosto</option>
            <option value={"Septiembre"}>Septiembre</option>
            <option value={"Octubre"}>Octubre</option>
            <option value={"Noviembre"}>Noviembre</option>
            <option value={"Diciembre"}>Diciembre</option>
          </select>

          <span style={{ marginLeft: "5px" }}></span>

          <select
            id='select_A_RT'
            onChange={handleAñoI}
            value={añoI}
            defaultValue={firstem}
          >
            {años.map((a) => (
              <option value={a.fecha} key={a.fecha}>
                {a.fecha}
              </option>
            ))}
          </select>

          <span style={{ marginLeft: "25px" }}></span>

          <select
            id='select_M_RT'
            onChange={handleMesF}
            value={mesF}
          >
            <option value={"Enero"}>Enero</option>
            <option value={"Febrero"}>Febrero</option>
            <option value={"Marzo"}>Marzo</option>
            <option value={"Abril"}>Abril</option>
            <option value={"Mayo"}>Mayo</option>
            <option value={"Junio"}>Junio</option>
            <option value={"Julio"}>Julio</option>
            <option value={"Agosto"}>Agosto</option>
            <option value={"Septiembre"}>Septiembre</option>
            <option value={"Octubre"}>Octubre</option>
            <option value={"Noviembre"}>Noviembre</option>
            <option value={"Diciembre"}>Diciembre</option>
          </select>

          <span style={{ marginLeft: "5px" }}></span>

          <select
            id='select_A_RT'
            onChange={handleAñoF}
            value={añoF}
            defaultValue={firstem}
          >
            {años.map((a) => (
              <option value={a.fecha} key={a.fecha}>
                {a.fecha}
              </option>
            ))}
          </select>

          <button onClick={buscarFecha} id='button_RA'
            style={{
              width: "auto",
              marginLeft: '0.5vw'
            }}
          >
            Buscar Fecha
          </button>

          <p>
            <span style={{ marginLeft: "0.5vw" }}>Desde: </span>
            <span style={{ marginLeft: "14.5vw" }} >Hasta: </span>
          </p>
        </div>
        <div id='item_RT'>
          <p>Ingresar destinario (correo electrónico):</p>

          <input
            id='input_RT'
            onChange={handleCorreo}
          >

          </input>

          <span style={{ marginLeft: "5px" }}></span>

          <button
            id='button_RT'
            onClick={send_email}
          >
            Enviar
          </button>
        </div>
      </div>

      <div
        id='contenedorR'
        style={{ width: '90vw', marginLeft: '4vw', marginTop: '2vh' }}
      >
        <p>
          A continuación se presenta un reporte completo de las entradas tardes
          marcadas dentro de la aplicación por el equipo de “Los Amigos de la
          Municipalidad”, con un reporte completo de datos personales y fechas
          de dichos marcajes entre el mes {mesI} y {mesF}.
        </p>
      </div>

      <div
        id='contenedorR'
        style={{ width: '90vw', marginLeft: '4vw', marginTop: '2vh' }}
      >
        <DataTable noDataComponent="Sin registros que mostrar" columns={columns} data={dataT} />
      </div>
    </div>
  )
}

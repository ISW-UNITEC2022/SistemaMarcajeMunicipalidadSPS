import { useEffect, useState } from 'react'
import MenuUsuario from '../../Componentes UI/MenuUsuario'
import BotonHome from '../../Componentes UI/BotonHome'
import Logo from '../../logo.png'
import DataTable from 'react-data-table-component'
import '../Reportes Asistencias/PantReportes_Asistencias.css'
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios'
import {Reporte_Asistencia_D} from './Reporte_Asistencias_D';
import {pdf} from "@react-pdf/renderer";
import { saveAs } from 'file-saver';


export default function Reporte_Asistencia_Tardia() {
  //https://proyecto-isw-dev.herokuapp.com/api/reportes/disponibles
  const url = "https://proyecto-isw-dev.herokuapp.com/api/reportes/disponibles";
  const [Tasks, setTasks] = useState([])
  const [dataT, setdataT] = useState([])

  const [correo, setCorreo] = useState("");

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
    if(mI.length===0){
      mI='Enero';
      setMesI(mI);
    }

    if(mF.length===0){
      mF='Enero';
      setMesF(mF);
    }
      
    const response = await fetch(
      'https://proyecto-isw-dev.herokuapp.com/api/reportes',{
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
            "month":  getMes(mF),
            "year": 2022
          }
        }),
      }
    )
    const data1 = await response.json()
    setTasks(data1)

    let data=[];
    for (let i = 0; i < data1.length; i++) {
      let salida;

      if(data1[i].marcas.salida)
        salida=data1[i].marcas.salida.hora;
      else 
        salida='N/A';

      data[i] = {
        counter: i + 1,
        idempleado: data1[i].idempleado,
        nombre: data1[i].nombre + ' ' + data1[i].apellido,
        departamento: data1[i].departamento,
        distrito: data1[i].distrito,
        fecha: data1[i].fecha,
        latitud: data1[i].marcas.entrada.latitud,
        longitud: data1[i].marcas.entrada.longitud,
        horaE: data1[i].marcas.entrada.hora,
        horaS: salida,
      }
    }
    setdataT(data);
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
      name: 'Hora Entrada',
      selector: (row: any) => row.horaE,
    },
    {
      name: 'Hora Salida',
      selector: (row: any) => row.horaS,
    },
    {
      name: 'Latitud',
      selector: (row: any) => row.latitud,
    },
    {
      name: 'Longitud',
      selector: (row: any) => row.longitud,
    },
  ]


  const getMes=(mes)=>{
    switch(mes){
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

  const generarD=()=>{

    let dataT=[];
    dataT[0]=[
    'No° Identidad',
    'Nombre Completo', 
    'Departamento',
    'Distrito',
    'Fecha',
    'Hora Entrada',
    'Hora Salida',
    'Latitud',
    'Longitud',
  ]

    for (let i = 1; i <= Tasks.length; i++) {
      let salida;

      if(Tasks[i-1].marcas.salida)
        salida=Tasks[i-1].marcas.salida.hora;
      else 
        salida='N/A';

      dataT[i] = [
        Tasks[i-1].idempleado,
        Tasks[i-1].nombre + ' ' + Tasks[i-1].apellido,
        Tasks[i-1].departamento,
        Tasks[i-1].distrito,
        Tasks[i-1].fecha,
        Tasks[i-1].marcas.entrada.hora,
        salida,
        Tasks[i-1].marcas.entrada.latitud,
        Tasks[i-1].marcas.entrada.longitud,
      ]
    }

    return dataT;
  }


  const downloadR = ()=>{
    let data = generarD();
    
    pdf(
      <Reporte_Asistencia_D mesI={getMes(mesI)} mesF={getMes(mesF)} dataT={data}></Reporte_Asistencia_D>
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

  function buscarFecha(){
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
        <h5>Formato de Reportes de Asistencia</h5>
      </div>

      <button onClick={downloadR} id='button_RA'
        style={{
          marginLeft: "71vw",
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

      <div id='grid_RA'>
        <div id='item_RA'>
          <p>Seleccionar rango de fecha del reporte:</p>
          <select 
            id='select_M_RA'
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
            id='select_A_RA'
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
            id='select_M_RA'
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
            id='select_A_RA'
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
        <div id='item_RA'>
          <p>Ingresar destinario (correo electrónico):</p>

          <input id='input_RA'></input>

          <span style={{ marginLeft: "5px" }}></span>

          <button id='button_RA'>Enviar</button>
        </div>
      </div>

      <div
        id='contenedorR'
        style={{ width: '90vw', marginLeft: '4vw', marginTop: '2vh' }}
      >
        <p>
        A continuación se presenta un reporte completo de las asistencias marcadas dentro de 
        la aplicación por el equipo de “Los Amigos de la Municipalidad”, con un reporte completo
        de datos personales y fechas de dichos marcajes entre el mes {mesI} y {mesF}.
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

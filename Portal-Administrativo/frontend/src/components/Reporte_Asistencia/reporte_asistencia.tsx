
import { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import MenuUsuario from '../MenuUsuario'
import BotonHome from '../BotonHome'
import Logo from '../logo.png'
import './asistencia.css'
import DataTable from 'react-data-table-component'

export default function Reporte_Asistencia_Tardia() {
  const [Tasks, setTasks] = useState([])

  const loadTasks = async () => {
    const response = await fetch(
      'https://proyecto-isw-dev.herokuapp.com/api/reportes'
    )
    const data = await response.json()
    setTasks(data)
  }

  let dataT = []

  useEffect(() => {
    loadTasks()
  }, [])

  for (let i = 0; i < Tasks.length; i++) {
    dataT[i] = {
      counter: i + 1,
      idempleado: Tasks[i].idempleado,
      nombre: Tasks[i].nombre + ' ' + Tasks[i].apellido,
      departamento: Tasks[i].departamento,
      distrito: Tasks[i].distrito,
      fecha: Tasks[i].fecha,
      salida: Tasks[i].marcas.salida,
      entrada: Tasks[i].marcas.entrada,
    }
  }

  /*
    const downloadPdf=()=>{
        const doc=new jsPDF();
    
        doc.text("Ejemplo Reporte",20,10);
        doc.autoTable({
          columns:[
            {header: '#', dataKey: 'num'},
            {header: 'No° Identidad', dataKey: 'idempleado'},
            {header: 'Nombre Completo', dataKey: 'nombre'},
            {header: 'Departamento', dataKey: 'departamento'},
            {header: 'Distrito', dataKey: 'distrito'},
            {header: 'Fecha', dataKey: 'fecha'},
            {header: 'Hora Asignad', dataKey: 'hora_asignada'},
            {header: 'Hora entrada', dataKey: 'hora_entrada'}
          ],
          body:dataT
        })
    
        doc.save('reporte_Tardias.pdf');
    }
    */

  let mes='Octubre';

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
      name: 'Salida',
      selector: (row: any) => row.salida,
    },
    {
      name: 'Entrada',
      selector: (row: any) => row.entrada,
    },
  ]

  return (
    <div>
      <MenuUsuario></MenuUsuario>
      <BotonHome></BotonHome>
      <div>
            <img src={Logo} style={{ height: '10vw', width: 'auto', marginLeft: '4vw' }} />
            <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}><h3>Dirección C3i Municipalidad de San Pedro Sula</h3></div>
        </div>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}><h5>Formato de Reportes de Asistencia</h5></div>
        <div id='contenedorR' style={{width: '90vw', marginLeft: '4vw', marginTop: '2vh'}}>
        <p>
        A continuación se presenta un reporte completo de las asistencias marcadas dentro de 
        la aplicación por el equipo de “Los Amigos de la Municipalidad”, con un reporte completo
        de datos personales y fechas de dichos marcajes en el mes de {mes}.
        </p>
        </div>

      <div
        id='contenedorR'
        style={{ width: '90vw', marginLeft: '4vw', marginTop: '2vh' }}
      >
        <DataTable columns={columns} data={dataT} />
      </div>
    </div>
  )
}
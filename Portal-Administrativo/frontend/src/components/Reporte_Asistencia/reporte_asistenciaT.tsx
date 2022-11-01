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
      'https://proyecto-isw-dev.herokuapp.com/api/reportes/tarde'
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
      hora_asignada: Tasks[i].hora_asignada,
      hora_entrada: Tasks[i].hora_entrada,
    }
  }

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
      name: 'Hora Asignada',
      selector: (row: any) => row.hora_asignada,
    },
    {
      name: 'Hora entrada',
      selector: (row: any) => row.hora_entrada,
    },
  ]

  return (
    <div>
      <MenuUsuario></MenuUsuario>
      <BotonHome></BotonHome>
      <div>
        <img
          src={Logo}
          style={{ height: '10vw', width: 'auto', marginLeft: '4vw' }}
        />
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

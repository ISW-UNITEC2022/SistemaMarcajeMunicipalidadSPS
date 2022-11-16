import { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import MenuUsuario from '../../Componentes UI/MenuUsuario'
import BotonHome from '../../Componentes UI/BotonHome'
import Logo from '../../../assets/Logo C3i Oficial.png'
import DataTable from 'react-data-table-component'

export default function Reporte_Marcas_Incompletas() {
  const [Tasks, setTasks] = useState([])

  const loadTasks = async () => {
    const response = await fetch(
      'https://proyecto-isw-dev.herokuapp.com/api/reportes/incompleto'
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
      hora_entrada: Tasks[i].entrada,
      hora_salida: Tasks[i].salida,
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
      name: 'Hora Entrada',
      selector: (row: any) => row.hora_entrada,
    },
    {
      name: 'Hora Salida',
      selector: (row: any) => row.hora_salida,
    },
  ]

  return (
    <div>
      <MenuUsuario></MenuUsuario>
      <BotonHome></BotonHome>
      <div>
        <div>
          <img
            src={Logo}
            style={{ height: '10vw', width: 'auto', marginLeft: '4vw' }}
          />
        </div>
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
      <div
        id='contenedorR'
        style={{ width: '90vw', marginLeft: '4vw', marginTop: '2vh' }}
      >
        <p>
          A continuación se presenta un reporte completo de las asistencias
          incompletas dentro de la aplicación por el equipo de “Los Amigos de la
          Municipalidad”, con un reporte completo de datos personales y fechas
          de dichos marcajes en el mes.
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

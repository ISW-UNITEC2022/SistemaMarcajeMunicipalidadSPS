import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import MenuUsuario from '../MenuUsuario';
import BotonHome from '../BotonHome';
import Logo from "../logo.png";
import './asistencia.css';
import DataTable from 'react-data-table-component';


export default function TaskList() {
    
    const [Tasks,setTasks] = useState([]);

    const loadTasks = async ()=>{
        const response=await fetch('https://proyecto-isw-dev.herokuapp.com/api/reportes/tarde')
        const data = await response.json()
        setTasks(data);
    }

    useEffect(()=>{
        loadTasks();
    },[])

    const columns=[
        {
            name: 'No° Identidad',
            selector: row => row.idempleado
        },
        {
            name: 'Nombre Completo',
            selector: row => row.nombre + ' ' + row.apellido
        },
        {
            name: 'Fecha',
            selector: row => row.fecha
        },
        {
            name: 'Hora Asignada',
            selector: row => row.hora_asignada
        },
        {
            name: 'Hora entrada',
            selector: row => row.hora_entrada
        },
    ]
    
    return (
    <div>

        <MenuUsuario></MenuUsuario>
        <BotonHome></BotonHome>
        <div>
            <img src={Logo} style={{ height: '10vw', width: 'auto', marginLeft: '4vw' }} />
        </div>

        <div id='contenedorR' style={{width: '90vw', marginLeft: '4vw', marginTop: '2vh'}}>
        <DataTable 
            columns={columns}
            data={Tasks}
        />
        </div>
      

    </div>
  )
}
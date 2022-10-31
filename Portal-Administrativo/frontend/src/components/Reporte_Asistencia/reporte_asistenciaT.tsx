import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import MenuUsuario from '../MenuUsuario';
import BotonHome from '../BotonHome';
import Logo from "../logo.png";
import './asistencia.css'


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

    loadTasks();
    
    const columnas=[
        {
            title: 'No° Identidad',
            field: 'idempleado'
        },
        {
            title: 'Nombre Completo',
            field: 'nombre'
        },
        {
            title: 'Fecha',
            field: 'fecha'
        },
        {
            title: 'Hora Asignada',
            field: 'hora_asignada'
        },
        {
            title: 'Hora entrada',
            field: 'hora_entrada'
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
            <MaterialTable
                columns={columnas}
                data={Tasks}
            />
        </div>
      

    </div>
  )
}
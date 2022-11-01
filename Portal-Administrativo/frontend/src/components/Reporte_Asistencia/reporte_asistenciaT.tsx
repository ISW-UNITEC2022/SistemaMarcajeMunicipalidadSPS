import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import MenuUsuario from '../MenuUsuario';
import BotonHome from '../BotonHome';
import Logo from "../logo.png";
import './asistencia.css';
import DataTable from 'react-data-table-component';
import reportWebVitals from '../../reportWebVitals';


export default function TaskList() {
    
    const [Tasks,setTasks] = useState([]);

    const [departamento,setD] = useState([]);

    const [distrito,setDis] = useState([]);

    const loadTasks = async ()=>{
        const response=await fetch('https://proyecto-isw-dev.herokuapp.com/api/reportes/tarde')
        const data = await response.json()
        setTasks(data);
    }

    const loadD = async (id)=>{
        const response=await fetch('https://proyecto-isw-dev.herokuapp.com/api/empleados/'+id)
        const data = await response.json()
        setD(data.departamento);
    }

    const loadDist = async (id)=>{
        const response=await fetch('https://proyecto-isw-dev.herokuapp.com/api/empleados/'+id)
        const data = await response.json()
        setDis(data.distrito);
    }

    
    let dataT = [];

    useEffect(()=>{
        loadTasks();
    },[])

    for(let i=0; i<Tasks.length; i++){
        loadD(Tasks[i].idempleado);
        loadDist(Tasks[i].idempleado);
        dataT[i]={
            num: i+1,
            idempleado: Tasks[i].idempleado,
            nombre: Tasks[i].nombre + ' ' + Tasks[i].apellido,
            departamento: departamento,
            distrito: distrito,
            fecha: Tasks[i].fecha,
            hora_asignada: Tasks[i].hora_asignada,
            hora_entrada: Tasks[i].hora_entrada,
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
          body:Tasks
        })
    
        doc.save('reporte_Tardias.pdf');
      }
    */

    const columns=[
        {
            name: '#',
            selector: row => row.num
        },
        {
            name: 'No° Identidad',
            selector: row => row.idempleado
        },
        {
            name: 'Nombre Completo',
            selector: row => row.nombre
        },
        {
            name: 'Departamento',
            selector: row => row.departamento
        },
        {
            name: 'Distrito',
            selector: row => row.distrito
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
            data={dataT}
        />
        </div>
      

    </div>
  )
}
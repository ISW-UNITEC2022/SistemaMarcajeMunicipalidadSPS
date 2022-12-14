import './menu_em.css';
import './menu.css';
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAuth0 } from '@auth0/auth0-react'

function DropdownM(props){

const {user} = useAuth0();

const url = "https://proyecto-isw1.herokuapp.com/api/supervisores/"+user.sub;

const [supervisor, setS] = useState(false);

const esAdmin = async()=>{

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    if(data.idempleado)
        setS(true)
    else
        setS(false)

}

useEffect(() => {
    esAdmin();
  }, []);
  
return(
    
    <div className={`ventana ${props.children==false ? 'hide' : ''}`} >
        
        <div>
            <a href="/crear_empleado"><div id='sub'><div id='point'><i className="fa-solid fa-circle"></i></div>Crear nuevo empleado</div></a> 
            <a href="/modificar_empleado" ><div id='sub'><div id='point'><i className="fa-solid fa-circle"></i></div>Modificar empleado</div></a> 
            <a href="/informacion_empleado" ><div id='sub'><div id='point'><i className="fa-solid fa-circle"></i></div>Informacion de empleados</div></a> 
            <a href="/dar_baja_alta" ><div id='sub'><div id='point'><i className="fa-solid fa-circle"></i></div>Estado empleados</div></a> 
            <a href="/asignar_supervisor" ><div id='sub'>{supervisor ? <div id='point'><i className="fa-solid fa-circle"></i></div>:''}{supervisor ? 'Asignar Supervisor':''}</div></a> 
        </div>
    </div>
)

};
export default DropdownM;
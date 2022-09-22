import './menu_em.css';
import './menu.css';
import React from 'react';

function DropdownM(props){

const esAdmin = (rol)=>{

    if(rol=="Administrador")
        return true;
    else
        return false;

}


return(
    <div className={`ventana ${props.children==false ? 'hide' : ''}`} >

        <div>
            <a href="/crear_empleado"><div className='sub'><div className='point'><i className="fa-solid fa-circle"></i></div>Crear nuevo empleado</div></a> 
            <a href="/modificar_empleado" ><div className='sub'><div className='point'><i className="fa-solid fa-circle"></i></div>Modificar empleado</div></a> 
            <a href="/informacion_empleado" ><div className='sub'><div className='point'><i className="fa-solid fa-circle"></i></div>Informacion de empleados</div></a> 
            <a href="/dar_baja_alta" ><div className='sub'><div className='point'><i className="fa-solid fa-circle"></i></div>Estado empleados</div></a> 
            <a href="/asignar_supervisor" ><div className='sub'>{esAdmin("Administrador") ? <div className='point'><i className="fa-solid fa-circle"></i></div>:''}{esAdmin("Administrador") ? 'Asignar Supervisor':''}</div></a> 
        </div>
    </div>
)

};
export default DropdownM;
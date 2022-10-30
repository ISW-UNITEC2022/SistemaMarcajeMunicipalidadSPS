import React from 'react';
import './menu_re.css';
import './menu.css';

function DropdownM(props){

return(
    <div className={`ventana2 ${props.children==false ? 'hide' : ''}`} >

        <div>
            <a href="/asistencias"><div id='sub'><div id='point'><i className="fa-solid fa-circle"></i></div>Reporte de Asistencia</div></a> 
            <a href="" ><div id='sub'><div id='point'><i className="fa-solid fa-circle"></i></div>Reporte de Tardias</div></a> 
        </div>
    </div>
)

};
export default DropdownM;
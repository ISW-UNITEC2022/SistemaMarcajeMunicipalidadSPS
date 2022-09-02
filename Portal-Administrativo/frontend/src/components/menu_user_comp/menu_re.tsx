import React from 'react';
import './menu_re.css';
import './menu.css';

function DropdownM(props){

return(
    <div className={`ventana2 ${props.children==false ? 'hide' : ''}`} >

        <div>
            <a href="" ><div className='sub'><div className='point'><i className="fa-solid fa-circle"></i></div>Reportes de  Asistencia</div></a>
            <a href="" ><div className='sub'><div className='point'><i className="fa-solid fa-circle"></i></div>Reportes de Tardias</div></a>
        </div>
    </div>
)

};
export default DropdownM;
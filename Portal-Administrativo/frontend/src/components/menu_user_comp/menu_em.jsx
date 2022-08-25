import './menu_em.css';
import './menu.css';
import FormularioEmpleado from '../FormularioEmpleado/FormularioEmpleado'
import HomePage from '../HomePage/Pantalla_Bienvenida'

function DropdownM(props){

return(
    <div className={`ventana ${props.children==false ? 'hide' : ''}`} >

        <div>
            <a href=""><div className='sub'><div className='point'><i class="fa-solid fa-circle"></i></div>Crear nuevo empleado</div></a> 
            <a href="" ><div className='sub'><div className='point'><i class="fa-solid fa-circle"></i></div>Modificar empleado</div></a> 
            <a href="" ><div className='sub'><div className='point'><i class="fa-solid fa-circle"></i></div>Informacion de empleados</div></a> 
            <a href="" ><div className='sub'><div className='point'><i class="fa-solid fa-circle"></i></div>Estado empleados</div></a> 
        </div>
    </div>
)

};
export default DropdownM;
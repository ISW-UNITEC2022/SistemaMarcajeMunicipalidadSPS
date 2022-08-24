import { useState } from 'react'
import './menu.css';
import Button from '@mui/material/Button';
import Menu_emp from './menu_em';
import Menu_re from './menu_re';
import Logo from "./logo.png";
import BarraSuperior from '../BarraSuperior';
import BarraInferior from '../BarraInferior';
import BotonHome from '../BotonHome';
import MenuUsuario from '../MenuUsuario';
import { useAuth0 } from '@auth0/auth0-react'

export default function TaskList() {

  const [open, setOpen] = useState(false);
  const abrir = () => {
    setOpen(!open);
    if (open2 == true)
      setOpen2(!open2);
  }

  const [open2, setOpen2] = useState(false);
  const abrir2 = () => {
    setOpen2(!open2);
    if (open == true)
      setOpen(!open);
  }

  return (
    <div className='BackApp'>
      <BarraSuperior></BarraSuperior>
      <div className='SupApp'>
        <div style={{ flex: 3 }}>
          <MenuUsuario></MenuUsuario>
        </div>
      </div>
      <div>
        <BotonHome></BotonHome>
      </div>

      <div className='menu_user'>
        <img src={Logo} className='logo' />

        <div className='caja'>
          <Button onClick={abrir} variant="contained"
            style={{
              backgroundColor: '#F2B705',
              width: 300,
              height: 43,
              fontSize: 20,
              textTransform: 'none',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >Empleados <div className='down'><i class="fa-solid fa-sort-down"></i></div>
          </Button>
          <Menu_emp>{open}</Menu_emp>
        </div>

        <div className={`caja_R ${open == true ? 'caja_R2' : ''}`}>
          <Button onClick={abrir2} variant="contained"
            style={{
              backgroundColor: '#F2B705',
              width: 300,
              height: 43,
              fontSize: 20,
              textTransform: 'none',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >Reportes <div className='down'><i class="fa-solid fa-sort-down"></i></div>
          </Button>
          <Menu_re>{open2}</Menu_re>
        </div>
      </div>
      <div className='PiedePagina'>
					<BarraInferior></BarraInferior>
			</div>
    </div >
    




  )
}
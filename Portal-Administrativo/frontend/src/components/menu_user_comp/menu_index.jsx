import { useEffect, useState } from 'react'
import './menu.css';
import Button from '@mui/material/Button';
import Menu_emp from './menu_em';
import Menu_re from './menu_re';
import Logo from "../HomePage/Estilos/Logo_C3i.png";
import BotonHome from '../BotonHome.jsx'
import HomeIcon from '@mui/icons-material/Home';
import MenuUsuario from '../MenuUsuario';

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
    <div>
      <div className='SupApp'>
        <div style={{ flex: 3 }}>
          <MenuUsuario></MenuUsuario>
        </div>
      </div>
      <div>
        <BotonHome></BotonHome>
      </div>
      <div className='menu_user'>
        <img src={Logo} style={{ height: 200, width: 'auto', marginBottom: 350 }} />

        <div className='caja'>
          <Button onClick={abrir} variant="contained"
            style={{
              width: 290,
              height: 45,
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              fontStyle: 'normal',
              textTransform: 'none',

              backgroundColor: '#F2B705',
              color: '#f2f2f2',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >Empleados <div className='down'><i class="fa-solid fa-sort-down"></i></div>
          </Button>
          <Menu_emp>{open}</Menu_emp>
        </div>

        <div className={`caja_R ${open == true ? 'caja_R2' : ''}`}>
          <Button onClick={abrir2} variant="contained"
            style={{
              width: 290,
              height: 45,
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              fontStyle: 'normal',
              textTransform: 'none',

              backgroundColor: '#F2B705',
              color: '#f2f2f2',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >Reportes <div className='down'><i class="fa-solid fa-sort-down"></i></div>
          </Button>
          <Menu_re>{open2}</Menu_re>
        </div>
      </div>
    </div>
  )
}
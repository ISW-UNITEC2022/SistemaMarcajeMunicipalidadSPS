import { useEffect, useState } from 'react'
import './menu.css';
import Button from '@mui/material/Button';
import Menu_emp from './menu_em';
import Menu_re from './menu_re';
import Logo from "./logo.png";
import BotonHome from '../BotonHome'
import MenuUsuario from '../MenuUsuario';
import React from 'react';

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
      <MenuUsuario input={""}></MenuUsuario>
      <BotonHome></BotonHome>
      <div className='menu_user'>
        <img src={Logo} style={{ height: '12vw', width: 'auto', marginTop: '0vw' }} />

        <div className='caja'>
          <Button onClick={abrir} variant="contained"
            style={{
              width:'19.5vw',
              height: '3vw',
              fontSize: '1.5vw',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              fontStyle: 'normal',
              textTransform: 'none',

              backgroundColor: '#F2B705',
              color: '#f2f2f2',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >Empleados <div className='down'><i className="fa-solid fa-sort-down"></i></div>
          </Button>
          <Menu_emp>{open}</Menu_emp>
        </div>

        <div className={`caja_R ${open == true ? 'caja_R2' : ''}`}>
          <Button onClick={abrir2} variant="contained"
            style={{
              width:'19.5vw',
              height: '3vw',
              fontSize: '1.5vw',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              fontStyle: 'normal',
              textTransform: 'none',

              backgroundColor: '#F2B705',
              color: '#f2f2f2',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >Reportes <div className='down'><i className="fa-solid fa-sort-down"></i></div>
          </Button>
          <Menu_re>{open2}</Menu_re>
        </div>
      </div>
    </div>
  )
}
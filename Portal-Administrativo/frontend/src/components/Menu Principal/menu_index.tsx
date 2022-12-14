import { useEffect, useState } from 'react'
import './menu.css';
import Button from '@mui/material/Button';
import Menu_emp from './menu_em';
import Menu_re from './menu_re';
import Logo from "../logo.png";
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import MenuUsuario from '../Componentes UI/MenuUsuario';
import BotonHome from '../Componentes UI/BotonHome';
import axios from 'axios';

export default function TaskList() {
  const url = "https://proyecto-isw1.herokuapp.com/api/empleados";
  const url2 = 'https://proyecto-isw1.herokuapp.com/api/supervisores/';

  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout, isLoading } = useAuth0();

  const [empleado, setEmpleado] = useState({
    idempleado: "",
    idsupervisor: null,
    nombre: "",
    apellido: "",
    correo: "",
    departamento: "",
    distrito: 0,
    status: "",
    horaentrada: "",
    horasalida: "",
    rol: "",
    zona: "",
  });

  const [dataSupervisor, setDataSupervisor] = useState({
    idempleado: '',
  })

  const usuario_id = () => {
    if (isAuthenticated) return user.sub
    else if (isLoading) return ""
    else return 'Error de Autenticacion'
  }

  const idSuper = usuario_id()

  useEffect(() => {
    getSupervisor()
    getEmp()
  }, [idSuper, dataSupervisor.idempleado]);

  const getSupervisor = () => {
    console.log('El id auth0 ' + idSuper)
    axios
      .get(url2 + idSuper)
      .then((response: any) => {
        const info = response.data
        setDataSupervisor(info)
      })
      .catch((err: any) => console.log(err))
  }

  const getEmp = () => {
    let _url = "";
    let _id = dataSupervisor.idempleado;

    _url = url + "/" + _id;

    axios
      .get(_url)
      .then((response) => {
        const _empleado = response.data;
        setEmpleado(_empleado);
        console.log("Statud: " + empleado.status)
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

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
    (isAuthenticated || isLoading)
      ?
      (empleado.status == "alta")
        ?
        <div>
          <MenuUsuario></MenuUsuario>
          <BotonHome></BotonHome>
          <div className='menu_user'>
            <img src={Logo} style={{ height: '12vw', width: 'auto', marginBottom: '18vw' }} />

            <div className='caja'>
              <Button onClick={abrir} variant="contained"
                style={{
                  width: '19.5vw',
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
                  width: '19.5vw',
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
        :
        ((idSuper == "Error de Autenticacion" && !isLoading) || (empleado.status == "baja"))
          ?
          <>
            {logout()}
          </>

          :
          <></>
      :
      <></>
  )
}
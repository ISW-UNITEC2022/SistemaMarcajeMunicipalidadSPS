import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import MenuUsuario from '../MenuUsuario';
import BotonHome from '../BotonHome';
import Logo from "../logo.png";
import './asistencia.css'


export default function TaskList() {



  return (
    <div>

        <MenuUsuario></MenuUsuario>
        <BotonHome></BotonHome>
        <div>
            <img src={Logo} style={{ height: '10vw', width: 'auto', marginLeft: '4vw' }} />
        </div>

        <div id='contenedorR' style={{width: '90vw', marginLeft: '4vw', marginTop: '2vh'}}>
            <table className="table table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">No° Identidad</th>
                        <th scope="col">Nombre Completo</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Distrito</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Hora Entrada</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
      

    </div>
  )
}
import React from "react";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import Button from "@mui/material/Button";
import { inputBaseClasses } from "@mui/material";
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom';

const BotonV = ({ input, width, type }) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  const { logout } = useAuth0();

  const configuracion = () => {

  }

  const action = () => {
    if (type == "confi")
      return configuracion();
    else if (type == "logout")
      return logout();
  }

  return (
    <Button onClick={() => action()}
      sx={{
        width: { width },
        height: 45,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
        textTransform: 'none',

        backgroundColor: '#02732A ',
        color: '#f2f2f2',

        marginTop: '2px',


        '&:hover': {
          backgroundColor: '#80E673',
          color: '#1F3821',
        },
      }}
    > {input} </Button>
  );
}

export default BotonV;
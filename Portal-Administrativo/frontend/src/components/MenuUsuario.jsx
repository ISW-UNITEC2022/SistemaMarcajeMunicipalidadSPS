import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import BotonV from './BotonV';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { useState } from 'react';
import { useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from "react-router-dom";

const SplitButton = ({ input }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const usuario = () => {
    if (isAuthenticated)
      return user.name;
    else
      return 'Error de Autenticacion';
  };

  if(!isAuthenticated)
    navigate('/');


  return (
    <React.Fragment>
      <ButtonGroup
        sx={{
          backgroundColor: '#078c03',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        variant="contained" ref={anchorRef} aria-label="split button">
        <Button
          sx={{
            backgroundColor: "#078c03",
            width: 450,
            color: '#f2f2f2',

            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            textTransform: 'none',

            '&:hover': {
              backgroundColor: '#80E673',
              color: '#1F3821',
            },
          }}
          onClick={handleToggle}
        >{usuario()}
          <ExpandMoreIcon sx={{ fontSize: 32, }}></ExpandMoreIcon>
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            sx={{
              backgroundColor: '#078c03',
              width: 450,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <div
                sx={{
                  display: 'flex',
                }}
              >
                <BotonV input={"Configurar Perfil"} width={"450px"} type={""}></BotonV>
              </div>
              <div
                sx={{
                  display: 'flex',
                }}
              >
                <BotonV input={"Cerrar Sesión"} width={"450px"} type={"logout"}></BotonV>
              </div>

            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

export default SplitButton;
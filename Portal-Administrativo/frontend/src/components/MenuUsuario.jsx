import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useState } from 'react';
import { useRef } from 'react';

const options = [<div><SettingsIcon/> Configurar Perfil</div>, <div><LogoutIcon/> Cerrar Sesión</div>];

const SplitButton = ({input}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);

  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        sx = {{
        backgroundColor: '#078c03',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,}}
        variant="contained" ref={anchorRef} aria-label="split button">
        <Button
          sx = {{
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
        >{input}
          <ExpandMoreIcon sx={{fontSize: 32,}}></ExpandMoreIcon>
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
          sx = {{
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
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={(event) => handleMenuItemClick(event, index)}

                      sx = {{
                        color: '#f2f2f2',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                        fontStyle: 'normal',
                        textTransform: 'none',

                        '&:hover': {
                          backgroundColor: '#80E673',
                          color: '#1F3821',
                        },
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

export default SplitButton;
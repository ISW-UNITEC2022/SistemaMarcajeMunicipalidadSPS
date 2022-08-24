import React from "react";

import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import Button from "@mui/material/Button";
import { inputBaseClasses } from "@mui/material";

const BotonV = ({ input, width }) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <Button onClick={handleClick}
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
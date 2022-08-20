import React from "react";

import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

export const Button = styled(MuiButton)((props) => ({
  width: 290,
  height: 45,
  fontSize: 20,
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  fontStyle: 'normal',
  textTransform: 'none',

  backgroundColor: '#02732A ',
  color: '#f2f2f2',

  marginBottom: 20,

  '&:hover': {
    backgroundColor: '#80E673',
    color: '#1F3821',
  },
 
}),
);

export default Button;
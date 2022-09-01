import React from "react";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

function BotonHome() {
  const Button = styled(MuiButton)((props) => ({
    width: 80,
    height: 70,
  
    backgroundColor: '#BF0404 ',
    color: '#f2f2f2',
  
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    
    position: "absolute",
    top: 20,
    right: 10,
  
    '&:hover': {
      backgroundColor: '#FF9084',
      color: '#360101',
    }, 
  }),
  );

  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate("/menu_principal")}>
        <HomeIcon style={{ fontSize: 40 }}/>
      </Button>
    </div>
  );
}

export default BotonHome;
import React from "react";
import Box from '@mui/material/Box';

const CajaTitulo = ({ _input }) => (
	<Box
		sx={{
			minHeight: '5vw',
			maxHeight: '5vw',
			backgroundColor: '#F2B705',
			top: '1.3vw',
			position: 'absolute',
			left: '33.3vw',
			width: '33.3vw',
			fontSize: '2vw',
			fontWeight: 'bold',
			fontFamily: 'sans-serif',
			fontStyle: 'normal',
			textTransform: 'none',
			color: '#f2f2f2',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
		{_input}
	</Box>

);

export default CajaTitulo;
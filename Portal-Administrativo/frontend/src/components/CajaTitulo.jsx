import React from "react";
import Box from '@mui/material/Box';

const CajaTitulo = ({ input }) => (
	<Box
		sx={{
			minHeight: 60,
			backgroundColor: '#F2B705',

			fontSize: 30,
			fontWeight: 'bold',
 			fontFamily: 'sans-serif',
  		fontStyle: 'normal',
  		textTransform: 'none',
			color: '#f2f2f2',
			display: 'flex',
			justifyContent: 'center',
  		alignItems: 'center',
		}}>
			{input}
	</Box>
	
);

export default CajaTitulo;
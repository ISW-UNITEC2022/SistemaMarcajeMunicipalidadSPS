import React from "react";
import Box from '@mui/material/Box';

const CajaTitulo = ({ input }) => (
	<Box
		sx={{
			minHeight: 60,
			maxWidth: '66vh',
			minWidth: '66vh',
			backgroundColor: '#F2B705',

			fontSize: 22,
			fontWeight: 'bold',
 			fontFamily: 'sans-serif',
  			fontStyle: 'normal',
  			textTransform: 'none',
			color: '#f2f2f2',
			display: 'flex',
			justifyContent: 'center',
  			alignItems: 'center',
			position: 'absolute',
			marginLeft: '66vh'
		}}>
			{input}
	</Box>
	
);

export default CajaTitulo;
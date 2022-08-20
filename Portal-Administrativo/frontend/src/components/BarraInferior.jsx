import React from "react";
import Box from '@mui/material/Box';

function BarraInferior(props) {
	return (
		<div>
			<Box
				sx={{
					minHeight: 20,
					flex: 1,
					backgroundColor: '#013613',

					fontSize: 11,
					fontWeight: 'bold',
  				fontFamily: 'sans-serif',
  				fontStyle: 'normal',
  				textTransform: 'none',
					color: '#f2f2f2',
					
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				Dirección C3i Municipalidad de San Pedro Sula
			</Box>
		</div>
	);
	
}

export default BarraInferior;
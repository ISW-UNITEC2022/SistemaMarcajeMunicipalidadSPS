import React from "react";
import Box from '@mui/material/Box';

const CajaTitulo = ({ input }) => (
	<div style={{
		display: 'flex',
		height: '100%',
	}}>
		<Box
			sx={{
				flex: 3,
				backgroundColor: '#f2f2f2',
			}}
		/>
		<Box
			sx={{
				minHeight: 60,
				backgroundColor: '#F2B705',
				flex: 3,

				fontSize: 22,
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
			{input}
		</Box>
		<Box
			sx={{
				flex: 3,
				backgroundColor: '#f2f2f2',
			}}
		/>
	</div>
	
);

export default CajaTitulo;
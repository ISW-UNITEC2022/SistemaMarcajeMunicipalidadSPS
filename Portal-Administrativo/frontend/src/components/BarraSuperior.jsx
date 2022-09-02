import React from "react";
import Box from '@mui/material/Box';

function BarraSuperior(props) {
	return (
		<div style={{
				display: 'flex',
				height: '100%',
		}}>
			<Box
				sx={{
					height: '1.4vw',
					flex: 3,
					backgroundColor: '#078C03',
				}}
			/>
			<Box
				sx={{
					flex: 3,
					backgroundColor: '#F2B705',
				}}
			></Box>
			<Box
				sx={{
					flex: 3,
					backgroundColor: '#BF0404',
				}}
			/>
		</div>
	);
	
}

export default BarraSuperior;
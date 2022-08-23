import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material";

export default function FormPropsTextFields() {

	const theme = createTheme({
		components: {
			MuiFormLabel: {
				styleOverrides: {
					asterisk: { color: "red" },
				},
			},
		},

	})

	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete="off"
		>
			<div>
				<ThemeProvider theme={theme}>
					<TextField
						required
						id="outlined-required"
						label="Nombres"

						sx={{

							'& label.Mui-focused': {
								color: '#02732A',
							},
							'& .MuiInput-underline:after': {
								borderBottomColor: '#02732A',
							},
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: '#02732A',
								},
								'&:hover fieldset': {
									borderColor: '#02732A',
									
								},
								'&.Mui-focused fieldset': {
									borderColor: '#02732A',
								},
							},
						}}
					/>
				</ThemeProvider>
			</div>
		</Box>
	);
}

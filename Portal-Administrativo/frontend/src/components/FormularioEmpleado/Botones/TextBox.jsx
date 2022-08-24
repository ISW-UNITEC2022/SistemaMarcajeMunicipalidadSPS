import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material";

const FormPropsTextFields = ({input, width}) => {

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
				'& .MuiTextField-root': { 
					marginRight: '10px',
					marginBottom: '10px',
					width: {width} },
			}}
			noValidate
			autoComplete="off"

		>
			<div>
				<ThemeProvider theme={theme}>
					<TextField
						required
						id="outlined-required"
						label={input}
					
						sx={{
							'& label.Mui-focused': {
								color: '#02732A',
								top: '6px'
							},
							'& .MuiInput-underline:after': {
								borderBottomColor: '#02732A',
							},
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: '#02732A',
									height: '55px',
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

export default FormPropsTextFields;
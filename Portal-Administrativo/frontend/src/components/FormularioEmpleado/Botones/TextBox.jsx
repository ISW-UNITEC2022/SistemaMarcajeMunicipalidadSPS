import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material";

const FormPropsTextFields = ({ _width, _onChange, _id, _value, _type, _label }) => {
	
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
		<ThemeProvider theme={theme}>
			<TextField
				required
				onChange={_onChange}
				id={_id}
				value={_value}
				type={_type}
				label={_label}

				sx={{
					marginRight: '50px',
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
							width: _width,
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
	);
}

export default FormPropsTextFields;
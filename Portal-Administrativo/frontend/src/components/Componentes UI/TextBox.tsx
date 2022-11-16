import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material";


const FormPropsTextFields = ({ _width, _onChange, _id, _value, _type, _label, _habilitar, _asterisk }) => {


	const theme = createTheme({
		components: {
			MuiFormLabel: {
				styleOverrides: {
					asterisk: { color: _asterisk },
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
				disabled={_habilitar}

				sx={{
					"& .MuiInputBase-root": {
						width: _width,
						marginRight: "12px",
						"& input": {
							textAlign: "left"
						}
					},
					'& label.Mui-focused': {
						color: '#02732A',
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
	);
}

export default FormPropsTextFields;
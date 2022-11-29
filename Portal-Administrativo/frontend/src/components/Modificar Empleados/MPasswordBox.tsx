import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from "@mui/material";

const FormPropsTextFields = ({ _onChange, _id, _value, _label }) => {

	const theme = createTheme({
		components: {
			MuiFormLabel: {
				styleOverrides: {
					asterisk: { color: "red" },
				},
			},
		},

	})

	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	return (
		<ThemeProvider theme={theme}>
			<TextField
				onChange={_onChange}
				id={_id}
				value={_value}
				type={showPassword ? "text" : "password"}
				label={_label}

				sx={{
					"& .MuiInputBase-root": {
						width: "238px",
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

				InputProps={{ 
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
		</ThemeProvider>
	);
}

export default FormPropsTextFields;
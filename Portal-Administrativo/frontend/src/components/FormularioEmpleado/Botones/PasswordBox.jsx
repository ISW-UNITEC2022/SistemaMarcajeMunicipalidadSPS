import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from "@mui/material";

const InputAdornments = ({ input }) => {
	const [values, setValues] = React.useState({
		amount: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	});

	const theme = createTheme({
		components: {
			MuiFormLabel: {
				styleOverrides: {
					asterisk: { color: "red" },
				},
			},
		},

	})

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
			<div>
				<ThemeProvider theme={theme}>
					<FormControl sx={{
						marginRight: '10px',
						marginBottom: '10px',
						width: '30ch',

						'& label.Mui-focused': {
							color: '#02732A',
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
						required
						InputLabelProps={{
							FormLabelClasses: {
								asterisk: {
									color: "red"
								}
							}
						}}
						variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password"
							sx={{
								"&.Mui-focused": {
									color: "#02732A"
								}
							}}
						>{input}</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
										sx={{
											'&:hover': {
												color: '#02732A',
											}
										}}
									>
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label={input}

						/>
					</FormControl>
				</ThemeProvider>
			</div>
		</Box>
	);
}

export default InputAdornments;
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const SelectTextFields = ({ input, width, type }) => {
	const [currency, setCurrency] = React.useState('EUR');
	
	let currencies = [];
	if(type == 'hora') {
		currencies = [
			{ value: '01:00', label: '01:00'	},{	value: '01:05', label: '01:05'	},{	value: '01:10', label: '01:10'	},{	value: '01:15', label: '01:15'	},{	value: '01:20', label: '01:20'	},{ value: '01:25',	label: '01:25'	},{	 value: '01:30', label: '01:30'	},{	value: '01:35', label: '01:35'	},{	value: '01:40', label: '01:40'	},{ value: '01:45', label: '01:45'	},{	value: '01:50', label: '01:50'	},{value: '01:55', label: '01:55'	},
			{ value: '02:00', label: '02:00'	},{	value: '02:05', label: '02:05'	},{	value: '02:10', label: '02:10'	},{	value: '02:15', label: '02:15'	},{	value: '02:20', label: '02:20'	},{ value: '02:25',	label: '02:25'	},{	 value: '02:30', label: '02:30'	},{	value: '02:35', label: '02:35'	},{	value: '02:40', label: '02:40'	},{ value: '02:45', label: '02:45'	},{	value: '02:50', label: '02:50'	},{value: '02:55', label: '02:55'	},
			{ value: '03:00', label: '03:00'	},{	value: '03:05', label: '03:05'	},{	value: '03:10', label: '03:10'	},{	value: '03:15', label: '03:15'	},{	value: '03:20', label: '03:20'	},{ value: '03:25',	label: '03:25'	},{	 value: '03:30', label: '03:30'	},{	value: '03:35', label: '03:35'	},{	value: '03:40', label: '03:40'	},{ value: '03:45', label: '03:45'	},{	value: '03:50', label: '03:50'	},{value: '03:55', label: '03:55'	},
			{ value: '04:00', label: '04:00'	},{	value: '04:05', label: '04:05'	},{	value: '04:10', label: '04:10'	},{	value: '04:15', label: '04:15'	},{	value: '04:20', label: '04:20'	},{ value: '04:25',	label: '04:25'	},{	 value: '04:30', label: '04:30'	},{	value: '04:35', label: '04:35'	},{	value: '04:40', label: '04:40'	},{ value: '04:45', label: '04:45'	},{	value: '04:50', label: '04:50'	},{value: '04:55', label: '04:55'	},
			{ value: '05:00', label: '05:00'	},{	value: '05:05', label: '05:05'	},{	value: '05:10', label: '05:10'	},{	value: '05:15', label: '05:15'	},{	value: '05:20', label: '05:20'	},{ value: '05:25',	label: '05:25'	},{	 value: '05:30', label: '05:30'	},{	value: '05:35', label: '05:35'	},{	value: '05:40', label: '05:40'	},{ value: '05:45', label: '05:45'	},{	value: '05:50', label: '05:50'	},{value: '05:55', label: '05:55'	},
			{ value: '06:00', label: '06:00'	},{	value: '06:05', label: '06:05'	},{	value: '06:10', label: '06:10'	},{	value: '06:15', label: '06:15'	},{	value: '06:20', label: '06:20'	},{ value: '06:25',	label: '06:25'	},{	 value: '06:30', label: '06:30'	},{	value: '06:35', label: '06:35'	},{	value: '06:40', label: '06:40'	},{ value: '06:45', label: '06:45'	},{	value: '06:50', label: '06:50'	},{value: '06:55', label: '06:55'	},
			{ value: '07:00', label: '07:00'	},{	value: '07:05', label: '07:05'	},{	value: '07:10', label: '07:10'	},{	value: '07:15', label: '07:15'	},{	value: '07:20', label: '07:20'	},{ value: '07:25',	label: '07:25'	},{	 value: '07:30', label: '07:30'	},{	value: '07:35', label: '07:35'	},{	value: '07:40', label: '07:40'	},{ value: '07:45', label: '07:45'	},{	value: '07:50', label: '07:50'	},{value: '07:55', label: '07:55'	},
			{ value: '08:00', label: '08:00'	},{	value: '08:05', label: '08:05'	},{	value: '08:10', label: '08:10'	},{	value: '08:15', label: '08:15'	},{	value: '08:20', label: '08:20'	},{ value: '08:25',	label: '08:25'	},{	 value: '08:30', label: '08:30'	},{	value: '08:35', label: '08:35'	},{	value: '08:40', label: '08:40'	},{ value: '08:45', label: '08:45'	},{	value: '08:50', label: '08:50'	},{value: '08:55', label: '08:55'	},
			{ value: '09:00', label: '09:00'	},{	value: '09:05', label: '09:05'	},{	value: '09:10', label: '09:10'	},{	value: '09:15', label: '09:15'	},{	value: '09:20', label: '09:20'	},{ value: '09:25',	label: '09:25'	},{	 value: '09:30', label: '09:30'	},{	value: '09:35', label: '09:35'	},{	value: '09:40', label: '09:40'	},{ value: '09:45', label: '09:45'	},{	value: '09:50', label: '09:50'	},{value: '09:55', label: '09:55'	},
			{ value: '10:00', label: '10:00'	},{	value: '10:05', label: '10:05'	},{	value: '10:10', label: '10:10'	},{	value: '10:15', label: '10:15'	},{	value: '10:20', label: '10:20'	},{ value: '10:25',	label: '10:25'	},{	 value: '10:30', label: '10:30'	},{	value: '10:35', label: '10:35'	},{	value: '10:40', label: '10:40'	},{ value: '10:45', label: '10:45'	},{	value: '10:50', label: '10:50'	},{value: '10:55', label: '10:55'	},
			{ value: '11:00', label: '11:00'	},{	value: '11:05', label: '11:05'	},{	value: '11:10', label: '11:10'	},{	value: '11:15', label: '11:15'	},{	value: '11:20', label: '11:20'	},{ value: '11:25',	label: '11:25'	},{	 value: '11:30', label: '11:30'	},{	value: '11:35', label: '11:35'	},{	value: '11:40', label: '11:40'	},{ value: '11:45', label: '11:45'	},{	value: '11:50', label: '11:50'	},{value: '11:55', label: '11:55'	},
			{ value: '12:00', label: '12:00'	},{	value: '12:05', label: '12:05'	},{	value: '12:10', label: '12:10'	},{	value: '12:15', label: '12:15'	},{	value: '12:20', label: '12:20'	},{ value: '12:25',	label: '12:25'	},{	 value: '12:30', label: '12:30'	},{	value: '12:35', label: '12:35'	},{	value: '12:40', label: '12:40'	},{ value: '12:45', label: '12:45'	},{	value: '12:50', label: '12:50'	},{value: '12:55', label: '12:55'	},	
		]
	}
	else if (type == 'horario') {
		currencies = [
			{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }
		]
	}
	else if (type == 'distrito') {
		currencies = [
			{ value: 'Distrito 01', label: 'Distrito 01' },
			{ value: 'Distrito 02', label: 'Distrito 02' },
			{ value: 'Distrito 03', label: 'Distrito 03' },
			{ value: 'Distrito 04', label: 'Distrito 04' },
			{ value: 'Distrito 05', label: 'Distrito 05' },
			{ value: 'Distrito 06', label: 'Distrito 06' },
			{ value: 'Distrito 07', label: 'Distrito 07' },
			{ value: 'Distrito 08', label: 'Distrito 08' },
			{ value: 'Distrito 09', label: 'Distrito 09' },
			{ value: 'Distrito 10', label: 'Distrito 10' },
			{ value: 'Distrito 11', label: 'Distrito 11' },
			{ value: 'Distrito 12', label: 'Distrito 12' },
			{ value: 'Distrito 13', label: 'Distrito 13' },
			{ value: 'Distrito 14', label: 'Distrito 14' },
			{ value: 'Distrito 15', label: 'Distrito 15' },
			{ value: 'Distrito 16', label: 'Distrito 16' },
			{ value: 'Distrito 17', label: 'Distrito 17' },
			{ value: 'Distrito 18', label: 'Distrito 18' },
			{ value: 'Distrito 19', label: 'Distrito 19' },
			{ value: 'Distrito 20', label: 'Distrito 20' },
		]
	}

	const handleChange = (event) => {
		setCurrency(event.target.value);
	};

	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': {
					marginRight: '10px',
					marginBottom: '10px',
					width: { width }
				},

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
			noValidate
			autoComplete="off"
		>
			<div>
				<TextField
					id="outlined-select-currency"
					select
					label={input}
					value={currency}
					onChange={handleChange}
				>
					{currencies.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			</div>
		</Box >
	);
}

export default SelectTextFields;
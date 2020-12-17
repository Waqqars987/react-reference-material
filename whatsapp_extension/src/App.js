import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './components/Copyright';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import './App.css';

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
		'@media (max-width: 768px)': {
			width: '90%',
		},
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function App() {
	const [whatsappNumber, setWhatsappNumber] = useState('');
	const classes = useStyles();

	const submitHandler = event => {
		event.preventDefault();
		window.location.href = `https://api.whatsapp.com/send?phone=${whatsappNumber}`;
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<WhatsAppIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Whatsapp Helper
				</Typography>
				<form className={classes.form} onSubmit={event => submitHandler(event)} noValidate>
					<PhoneInput
						inputProps={{
							name: 'Phone Number',
							required: true,
							autoFocus: true,
						}}
						placeholder='Enter Phone Number'
						country={'in'}
						inputStyle={{ width: '100%' }}
						preferredCountries={['in']}
						countryCodeEditable={false}
						value={whatsappNumber}
						onChange={value => setWhatsappNumber(value)}
						defaultErrorMessage='Enter a valid phone number!'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={whatsappNumber.length < 9}
					>
						Send
					</Button>
					<Grid container>
						<Grid item>
							<Link target='_blank' href='https://whatsapp.com/dl' variant='body2'>
								{"Don't have Whatsapp? Download now!"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

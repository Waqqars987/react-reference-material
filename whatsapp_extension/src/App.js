import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './components/Copyright';
import './App.css';

const useStyles = makeStyles(theme => ({
	paper  : {
		marginTop     : theme.spacing(8),
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'center'
	},
	avatar : {
		margin          : theme.spacing(1),
		backgroundColor : theme.palette.secondary.main
	},
	form   : {
		width                       : '100%',
		marginTop                   : theme.spacing(1),
		'@media (max-width: 768px)' : {
			width : '90%'
		}
	},
	submit : {
		margin : theme.spacing(3, 0, 2)
	}
}));

export default function App () {
	const [ whatsappNumber, setWhatsappNumber ] = useState('');
	const [ error, setError ] = useState(false);
	const [ message, setMessage ] = useState(`Kindly omit the '+' symbol.`);
	const classes = useStyles();

	const submitHandler = event => {
		event.preventDefault();
		if (whatsappNumber.length === 0) {
			setError(true);
			setMessage(`Whatsapp number is required.`);
			return;
		}
		window.location.href = `https://api.whatsapp.com/send?phone=${whatsappNumber}`;
	};

	const inputChangeHandler = event => {
		if (error) {
			setError(false);
			setMessage(`Kindly omit the '+' symbol.`);
		}
		setWhatsappNumber(event.target.value);
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
					<TextField
						variant='outlined'
						margin='normal'
						type='number'
						required
						fullWidth
						id='whatsappNumber'
						label='Whatsapp Number with Country Code'
						name='whatsappNumber'
						autoFocus
						defaultValue={whatsappNumber}
						onChange={event => inputChangeHandler(event)}
						error={error}
						helperText={message}
					/>
					<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
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

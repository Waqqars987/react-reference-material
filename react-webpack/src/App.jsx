import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';

function ButtonUsage() {
	return <Button variant='contained'>Hello world</Button>;
}

function handleClick(event) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

const App = () => (
	<>
		<CssBaseline />

		<ButtonUsage />

		<div role='presentation' onClick={handleClick}>
			<Breadcrumbs aria-label='breadcrumb'>
				<Link underline='hover' color='inherit' href='/'>
					MUI
				</Link>
				<Link underline='hover' color='inherit' href='/material-ui/getting-started/installation/'>
					Core
				</Link>
				<Typography color='text.primary'>Breadcrumbs</Typography>
			</Breadcrumbs>
		</div>
	</>
);

export default App;

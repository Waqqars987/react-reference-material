import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

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

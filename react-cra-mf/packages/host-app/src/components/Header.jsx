import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const pages = [
	{ name: 'Home', path: '/' },
	{ name: 'Recipe', path: 'recipe' },
	{ name: 'Loader', path: 'loader' }
];

export const Header = () => (
	<AppBar position='static'>
		<Toolbar>
			<Typography variant='h6' component='span'>
				Host
			</Typography>

			<Box sx={{ ml: 'auto', display: 'flex' }} component='nav'>
				{pages.map(page => (
					<Button
						to={page.path}
						key={page.name}
						component={NavLink}
						sx={{
							my: 2,
							color: 'white',
							display: 'block',
							'&.active': { textDecoration: 'underline', textDecorationThickness: 2 }
						}}
					>
						{page.name}
					</Button>
				))}
			</Box>
		</Toolbar>
	</AppBar>
);

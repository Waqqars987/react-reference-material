import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => (
	<AppBar position='static'>
		<Toolbar>
			<Typography variant='h6' component='h1' sx={{ flexGrow: 1 }}>
				Host App
			</Typography>
		</Toolbar>
	</AppBar>
);

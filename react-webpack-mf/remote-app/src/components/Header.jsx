import { AppBar, Toolbar, Typography } from '@mui/material';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';

export const Header = () => (
	<AppBar position='static' color='secondary'>
		<Toolbar sx={{ gap: 1 }}>
			<SettingsRemoteIcon />

			<Typography variant='h6' component='h1' sx={{ flexGrow: 1 }}>
				Remote App
			</Typography>
		</Toolbar>
	</AppBar>
);

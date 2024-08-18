import { CssBaseline, ThemeProvider } from '@mui/material';

export default function Theme({ children }) {
	return (
		<ThemeProvider theme={{}}>
			<CssBaseline />

			{children}
		</ThemeProvider>
	);
}

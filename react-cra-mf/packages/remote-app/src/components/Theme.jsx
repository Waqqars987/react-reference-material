import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Theme({ children }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			{children}
		</ThemeProvider>
	);
}

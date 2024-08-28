import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';

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

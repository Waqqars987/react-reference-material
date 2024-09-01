import { Alert, AlertTitle } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
	const error = useRouteError();

	return (
		<Alert severity='error' sx={{ whiteSpace: 'pre' }}>
			<AlertTitle>{error.message}</AlertTitle>
			{error.stack}
		</Alert>
	);
}

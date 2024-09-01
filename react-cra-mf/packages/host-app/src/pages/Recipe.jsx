import { lazy, Suspense } from 'react';
import { Typography } from '@mui/material';

const ReceipeCard = lazy(() => import('Remote/recipe'));

export const Component = () => {
	return (
		<Suspense fallback={<Typography>Loading Module...</Typography>}>
			<ReceipeCard />
		</Suspense>
	);
};

Component.displayName = 'Recipe';

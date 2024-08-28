import { lazy, Suspense } from 'react';
import { Typography } from '@mui/material';

const ReceipeCard = lazy(() => import('Remote/recipe'));

const Recipe = () => {
	return (
		<Suspense fallback={<Typography>Loading Module...</Typography>}>
			<ReceipeCard />
		</Suspense>
	);
};

export default Recipe;

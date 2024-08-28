import { useState, lazy, Suspense } from 'react';
import { Button, Typography } from '@mui/material';

import Theme from './components/Theme';
import { Header } from './components/Header';

const ReceipeCard = lazy(() => import('Remote/recipe'));

const App = () => {
	const [showCard, setShowCard] = useState(false);

	return (
		<Theme>
			<Header />
			<main>
				<Button variant='contained' onClick={() => setShowCard(prev => !prev)}>
					Toggle Card
				</Button>

				{showCard && (
					<Suspense fallback={<Typography>Loading Module...</Typography>}>
						<ReceipeCard />
					</Suspense>
				)}
			</main>
		</Theme>
	);
};

export default App;

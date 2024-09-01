import Theme from './components/Theme';
import { Header } from './components/Header';
import RecipeReviewCard from './components/RecipeReviewCard';

const App = () => (
	<Theme>
		<Header />
		<main>
			<RecipeReviewCard />
		</main>
	</Theme>
);

export default App;

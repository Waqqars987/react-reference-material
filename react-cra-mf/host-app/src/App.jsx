import { createBrowserRouter, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import Load from './pages/Load';
import Recipe from './pages/Recipe';
import Theme from './components/Theme';
import { Header } from './components/Header';
import ErrorBoundary from './components/ErroBoundary';

const App = () => {
	return (
		<Theme>
			<Header />
			<main>
				<Outlet />
			</main>
		</Theme>
	);
};

export default App;

export const Router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'recipe', element: <Recipe /> },
			{ path: 'loader', element: <Load />, errorElement: <ErrorBoundary /> }
		]
	}
]);

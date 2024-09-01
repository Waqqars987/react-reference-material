import { createBrowserRouter, Outlet } from 'react-router-dom';

import Home from './pages/Home';
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
			{ path: 'recipe', lazy: () => import('./pages/Recipe') },
			{ path: 'loader', lazy: () => import('./pages/Loader'), errorElement: <ErrorBoundary /> }
		]
	}
]);

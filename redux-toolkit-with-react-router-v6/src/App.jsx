import { Routes, Route, NavLink } from 'react-router-dom';

import Home from './Home';
import Counter from './Counter';
import Posts from './Posts';
import Post from './Post';
import Test from './Test';

function App() {
	return (
		<>
			<nav className='navbar'>
				<ul className='navitems'>
					<li>
						<NavLink to='/'>Home</NavLink>
					</li>
					<li>
						<NavLink to='/counter'>Counter</NavLink>
					</li>
					<li>
						<NavLink to='/posts'>Posts</NavLink>
					</li>
					<li>
						<NavLink to='/test'>Test</NavLink>
					</li>
				</ul>
			</nav>

			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/counter' element={<Counter />} />
					<Route path='/posts' element={<Posts />}>
						{/* <Route index element={<Posts />} /> */}
						<Route path=':id' element={<Post />} />
						<Route path='' element={<h2>Select a post</h2>} />
					</Route>
					<Route path='/test' element={<Test />} />
					<Route path='*' element={<h1>404</h1>} />
				</Routes>
			</main>
		</>
	);
}

export default App;

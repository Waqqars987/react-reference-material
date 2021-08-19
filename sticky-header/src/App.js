import { useRef } from 'react';

import useSticky from './useSticky';
import './App.css';

function App() {
	const headerRef = useRef(null);
	const { sticky, stickyContextElemRef } = useSticky(headerRef);

	return (
		<>
			<header className={sticky ? 'navbar sticky' : 'navbar'} ref={headerRef}>
				<nav className='navigation'>{sticky ? 'STICKY' : ''} NAV</nav>
			</header>

			<main className='content'>
				<div className='box' ref={stickyContextElemRef}>
					<h2>My div context </h2>
				</div>
				<div className='box'>
					<h2>My div content </h2>
				</div>
				<div className='box'>
					<h2>My div content </h2>
				</div>
			</main>
		</>
	);
}
export default App;

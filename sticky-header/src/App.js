// import { useRef } from 'react';

import useSticky from './useSticky';
import './App.css';

const App = () => {
	// const myStickyElementRef = useRef(null);
	// const myStickyContextRef = useRef(null);
	// const { isSticky } = useSticky(myStickyElementRef, myStickyContextRef);

	const { isSticky, stickyElementRef } = useSticky();

	return (
		<>
			<header className={`header ${isSticky ? 'header--hidden' : ''}`} ref={stickyElementRef}>
				Site Header
			</header>

			<div className={isSticky ? 'navbar navbar--sticky' : 'navbar'}>
				{isSticky ? 'Sticky' : ''} Nav
			</div>

			<main className='content'>
				<div className='box'>
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
};

export default App;

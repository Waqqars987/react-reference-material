import useSticky from './useSticky';
import './App.css';

const App = () => {
	const { isSticky, stickyElementRef, stickyContextRef } = useSticky();

	return (
		<>
			<header className={isSticky ? 'navbar sticky' : 'navbar'} ref={stickyElementRef}>
				<nav className='navigation'>{isSticky ? 'STICKY' : ''} NAV</nav>
			</header>

			<main className='content'>
				<div className='box' ref={stickyContextRef}>
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

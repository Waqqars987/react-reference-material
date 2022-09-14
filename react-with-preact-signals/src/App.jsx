import Counter from './feature/Counter';

function App() {
	console.log('🚀 ~ App ~ Render');
	return (
		<div className='App'>
			<h1>
				<u>React with Preact Signals</u>
			</h1>

			<Counter />
		</div>
	);
}

export default App;

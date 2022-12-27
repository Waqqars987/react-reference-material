import './App.css';
import { Counter } from './components/counter/Counter';
// import { Application } from './components/application/Application';
// import { Skills } from './components/skills/Skills';

function App() {
	return (
		<div className='App'>
			{/* <Application /> */}
			{/* <Skills skills={['HTML', 'CSS', 'JavScript']} /> */}
			<Counter />
		</div>
	);
}

export default App;

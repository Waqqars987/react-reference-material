import React, { Component } from 'react';
// import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
	state = {
		persons    : [ { name: 'Max', age: 28 }, { name: 'Manu', age: 29 }, { name: 'Stephanie', age: 26 } ],
		otherState : 'some other value'
	};

	switchNameHandler = newName => {
		// console.log('Was clicked!');
		// DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
		this.setState({
			persons : [ { name: newName, age: 28 }, { name: 'Manu', age: 29 }, { name: 'Stephanie', age: 27 } ]
		});
	};

	nameChangedHandler = event => {
		this.setState({
			persons : [
				{ name: 'Max', age: 28 },
				{ name: event.target.value, age: 29 },
				{ name: 'Stephanie', age: 27 }
			]
		});
	};

	render () {
		const style = {
			backgroundColor : 'white',
			font            : 'inherit',
			border          : '1px solid blue',
			padding         : '8px',
			cursor          : 'pointer'
		};
		return (
			<div className='App'>
				<h1>Hi, I'm a React App</h1>
				<p>This is really working!</p>
				<button onClick={() => this.switchNameHandler('Wakkyguy')} style={style}>
					Switch Name
				</button>
				<Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
				<Person
					name={this.state.persons[1].name}
					age={this.state.persons[1].age}
					click={this.switchNameHandler.bind(this, 'Waqqar')} //preferred synatx to pass values to functions
					changed={this.nameChangedHandler}
				>
					My Hobbies: Racing
				</Person>
				<Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
			</div>
		);
		// return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
	}
}

export default App;

/******  FUNCTIONAL COMPONENT WITH STATE MANAGEMENT *******/
// const App = props => {
// 	const [ personsState, setPersonsState ] = useState({
// 		persons : [ { name: 'Waqqar', age: 25 }, { name: 'Baun', age: 23 }, { name: 'Anjum', age: 55 } ]
// 	});

// 	const [ otherState, setOtherState ] = useState('some other value');

// 	console.log(personsState, otherState);

// 	const switchNameHandler = () => {
// 		// console.log('was clicked');
// 		// DON'T DO THIS: this.state.persons[0].name = 'Wakky';
// 		setPersonsState({
// 			persons : [ { name: 'Wakkyguy', age: 25 }, { name: 'Baun', age: 23 }, { name: 'Mummy', age: 55 } ]
// 		});
// 	};

// 	return (
// 		<div className='App'>
// 			<h1>Hi, I'm a React App</h1>
// 			<p>This is really working!</p>
// 			<button onClick={switchNameHandler}>Switch Name</button>
// 			<Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
// 			<Person name={personsState.persons[1].name} age={personsState.persons[1].age}>
// 				My Hobbies: Racing
// 			</Person>
// 			<Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
// 		</div>
// 	);
// 	// return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Working?')); //equivalent of above code
// };

// export default App;

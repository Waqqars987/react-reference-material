import React, { Component } from 'react';
import classes from './App.css';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
	constructor (props) {
		super(props);
		console.log('App.js constructor');
		// we can do 'this.state' here
	}

	state = {
		persons       : [
			{ id: 'fgewddrf', name: 'Max', age: 28 },
			{ id: 'asfsdfg', name: 'Manu', age: 29 },
			{ id: 'hjkhjkj', name: 'Stephanie', age: 26 }
		],
		otherState    : 'some other value',
		showPersons   : false,
		showCockpit   : true,
		changeCounter : 0,
		authenticated : false
	};

	static getDerivedStateFromProps (props, state) {
		console.log('Apps.js getDerivedStateFromProps', props);
		return state;
	}

	// Deprecated
	// componentWillMount () {
	// 	console.log('App.js componentWillMount');
	// }

	componentDidMount () {
		console.log('App.js componentDidMount');
	}

	shouldComponentUpdate (nextProps, nextState) {
		console.log('App.js shouldComponentUpdate');
		return true;
	}

	componentDidUpdate () {
		console.log('App.js componentDidUpdate');
	}

	deletePersonHandler = (personIndex) => {
		const persons = [ ...this.state.persons ];
		persons.splice(personIndex, 1);
		this.setState({ persons: persons });
	};

	nameChangedHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex((p) => {
			return p.id === id;
		});
		const person = {
			...this.state.persons[personIndex]
		};
		person.name = event.target.value;
		const persons = [ ...this.state.persons ];
		persons[personIndex] = person;

		// recommended for updating a state that depends on a previous state
		this.setState((prevState, props) => {
			return {
				persons       : persons,
				changeCounter : prevState.changeCounter + 1
			};
		});
	};

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({ showPersons: !doesShow });
	};

	loginHandler = () => {
		this.setState({ authenticated: true });
	};

	render () {
		console.log('App.js render');
		let persons = null;
		if (this.state.showPersons) {
			persons = (
				<Persons
					persons={this.state.persons}
					clicked={this.deletePersonHandler}
					changed={this.nameChangedHandler}
				/>
			);
		}

		return (
			// 1st way of using HOC
			// <WithClass classes={classes.App}>
			// 	<button
			// 		onClick={() => {
			// 			this.setState({ showCockpit: false });
			// 		}}
			// 	>
			// 		Remove Cockpit
			// 	</button>
			// 	{this.state.showCockpit ? (
			// 		<Cockpit
			// 			title={this.props.appTitle}
			// 			showPersons={this.state.showPersons}
			// 			personsLength={this.state.persons.length}
			// 			clicked={this.togglePersonsHandler}
			// 		/>
			// 	) : null}
			// 	{persons}
			// </WithClass>

			// 2nd of using HOC...
			<Aux>
				<button
					onClick={() => {
						this.setState({ showCockpit: false });
					}}
				>
					Remove Cockpit
				</button>
				<AuthContext.Provider value={{ authenticated: this.state.authenticated, login: this.loginHandler }}>
					{this.state.showCockpit ? (
						<Cockpit
							title={this.props.appTitle}
							showPersons={this.state.showPersons}
							personsLength={this.state.persons.length}
							clicked={this.togglePersonsHandler}
						/>
					) : null}
					{persons}
				</AuthContext.Provider>
			</Aux>
		);
	}
}

// continuation of 2nd way of suing HOC
export default withClass(App, classes.App);

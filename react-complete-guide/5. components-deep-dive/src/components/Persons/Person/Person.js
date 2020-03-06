import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
	//syntax for newer way of using ref
	constructor (props) {
		super(props);
		this.inputElementRef = React.createRef();
	}

	static contextType = AuthContext;

	componentDidMount () {
		//this.inputElementRef.focus();	//syntax for older way of using ref
		this.inputElementRef.current.focus(); //syntax for newer way of using ref
		console.log(this.context.authenticated);
	}

	render () {
		console.log('Person.js rendering...');
		// returning adjacent elements using empty wrapper component(higher order component)
		return (
			<Aux>
				{this.context.authenticated ? (
					<p>
						<b>Authenticated</b>
					</p>
				) : (
					<p>
						<b>Please Login</b>
					</p>
				)}
				<p key='i1' onClick={this.props.click}>
					I'm {this.props.name} and I am {this.props.age} years old!
				</p>
				<p key='i2'>
					<em>{this.props.children}</em>
				</p>
				<input
					key='i3'
					type='text'
					onChange={this.props.changed}
					value={this.props.name}
					// Older way of using ref on an element, does not require the use Constructor
					// ref={(inputEl) => {
					// 	this.inputElement = inputEl;
					// }}

					// Newer way of using ref on an element, requires the use of Constructor
					ref={this.inputElementRef}
				/>
			</Aux>
		);

		// returning adjacent elements using array approach
		// return [
		// 	<p key='i1' onClick={this.props.click}>
		// 		I'm {this.props.name} and I am {this.props.age} years old!
		// 	</p>,
		// 	<p key='i2'>{this.props.children}</p>,
		// 	<input key='i3' type='text' onChange={this.props.changed} value={this.props.name} />
		// ];

		// returning adjacent elements using React Fragment
		// return (
		// 	<Fragment>
		// 		<p key='i1' onClick={this.props.click}>
		// 			I'm {this.props.name} and I am {this.props.age} years old!
		// 		</p>
		// 		<p key='i2'>{this.props.children}</p>
		// 		<input key='i3' type='text' onChange={this.props.changed} value={this.props.name} />
		// 	</Fragment>
		// );
	}
}

/* setting strict typing for props that this component can receive,
provides warning during development */
Person.propTypes = {
	click   : PropTypes.func,
	name    : PropTypes.string,
	age     : PropTypes.number,
	changed : PropTypes.func
};

export default withClass(Person, classes.Person);

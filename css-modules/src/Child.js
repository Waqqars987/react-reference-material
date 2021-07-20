import React from 'react';
// New Syntax for importing CSS file
import classes from './Child.module.css';

function Child() {
	// Actual Class name that is applied
	console.log(classes.circle);

	// New Syntax for using CSS classes
	return <div className={classes.circle}></div>;
}

export default Child;

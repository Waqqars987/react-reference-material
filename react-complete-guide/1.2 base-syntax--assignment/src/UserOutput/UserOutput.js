import React from 'react';
import './UserOutput.css';

const userOutput = props => {
	return (
		<div className='UserOutput'>
			<p>Username: {props.username}</p>
			<p>some text</p>
		</div>
	);
};

export default userOutput;

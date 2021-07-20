import React from 'react';

const Input = ({ type, setter, value, param, autoFocus }) => {
	switch (type) {
		case 'text':
			return (
				<input onChange={event => setter(event.target.value)} value={value} autoFocus={autoFocus} />
			);
		case 'checkbox':
			return (
				<input
					type='checkbox'
					checked={value}
					onChange={() => setter(param)}
					title={value ? 'Mark Incomplete' : 'Mark Complete'}
				/>
			);
		default:
			return;
	}
};

export default Input;

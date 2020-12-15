import React from 'react';

const Button = ({ onClick, param, type, disabled, children }) => (
	<button
		type={type || 'button'}
		onClick={() => onClick && onClick(param)}
		disabled={disabled}
		title={disabled && 'Enter a value first'}
	>
		{children}
	</button>
);

export default Button;

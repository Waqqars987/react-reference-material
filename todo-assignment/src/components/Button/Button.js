import React from 'react';

const Button = ({ onClick, param, type, disabled, className, children }) => (
	<button
		className={className}
		type={type || 'button'}
		onClick={() => onClick && onClick(param)}
		disabled={disabled}
		title={disabled && 'Enter a value first'}
	>
		{children}
	</button>
);

export default Button;

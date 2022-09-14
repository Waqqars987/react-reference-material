function Button({ children, ...rest }) {
	console.log('🚀 ~ Button ~ Render');
	return <button {...rest}>{children}</button>;
}

export default Button;

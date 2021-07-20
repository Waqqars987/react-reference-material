import React from 'react';

// 1st way of creating HOC
// const withClass = (props) => <div className={props.classes}>{props.children}</div>;

// 2nd way of creating HOC
const withClass = (WrappedComponent, className) => {
	return (props) => (
		<div className={className}>
			<WrappedComponent {...props} />
		</div>
	);
};

export default withClass;

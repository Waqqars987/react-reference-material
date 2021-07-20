import React from 'react';
// import { withRouter } from 'react-router-dom';
import './Post.css';

const post = (props) => {
	// console.log(props);
	return (
		<article className='Post' onClick={props.clicked}>
			<h1>{props.title}</h1>
			<div className='Info'>
				<div className='Author'>{props.author}</div>
			</div>
		</article>
	);
};

// using withRouter to receive router props down in the component tree, i.e. from the parent here (Posts)
// export default withRouter(post);

export default post;

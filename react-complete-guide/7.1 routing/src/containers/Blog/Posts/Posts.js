import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';
import { Route } from 'react-router-dom';

class Posts extends Component {
	state = {
		posts : []
	};

	componentDidMount () {
		// console.log(this.props);
		axios
			.get('/posts')
			.then((response) => {
				const posts = response.data.slice(0, 4);
				const updatedPosts = posts.map((post) => {
					return {
						...post,
						author : 'Waqqar'
					};
				});
				this.setState({ posts: updatedPosts });
			})
			.catch((error) => {
				console.log(error);
				// this.setState({ error: true });
			});
	}

	postSelectedHandler = (id) => {
		// this.setState({ selectedPostId: id });

		// Programmatic navigation
		this.props.history.push({ pathname: '/posts/' + id }); //passing object
		// this.props.history.push('/posts/' + id); //passing string
	};

	render () {
		let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
		if (!this.state.error) {
			posts = this.state.posts.map((post) => {
				return (
					// <Link to={'/' + post.id} key={post.id}>
					// 	<Post
					// 		title={post.title}
					// 		author={post.author}
					// 		clicked={() => this.postSelectedHandler(post.id)}
					// 		// {...this.props} // One way of passing router props down the component tree
					// 	/>
					// </Link>
					<Post
						key={post.id}
						title={post.title}
						author={post.author}
						clicked={() => this.postSelectedHandler(post.id)}
						// {...this.props} // One way of passing router props down the component tree
					/>
				);
			});
		}
		return (
			<div>
				<section className='Posts'>{posts}</section>
				<Route path={this.props.match.url + '/:id'} exact component={FullPost} />
			</div>
		);
	}
}

export default Posts;

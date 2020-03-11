import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
import { Route, NavLink, Switch } from 'react-router-dom';

class Blog extends Component {
	render () {
		return (
			<div className='Blog'>
				<header>
					<nav>
						<ul>
							<li>
								{/* Custom active class with custom style */}
								<NavLink
									to='/'
									exact
									activeClassName='my-active'
									activeStyle={{ color: '#fa923f', textDecoration: 'underline' }}
								>
									{/* <NavLink to='/' exact > */}
									Posts
								</NavLink>
							</li>
							<li>
								<NavLink
									to={{
										pathname : '/new-post', //absolute path
										// pathname : this.props.match.url + '/new-post', //relative path
										hash     : '#submit',
										search   : '?quick-submit=true'
									}}
								>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				{/* <Route path='/' exact render={() => <h1>Home</h1>} />
				<Route path='/' render={() => <h1>Home 2</h1>} /> */}
				<Route path='/' exact component={Posts} />
				<Switch>
					<Route path='/new-post' component={NewPost} />
					<Route path='/:id' exact component={FullPost} />
				</Switch>
			</div>
		);
	}
}

export default Blog;

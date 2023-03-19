import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPosts } from './store/slices/posts';

function Posts() {
	const dispatch = useDispatch();
	const { loading, data, error } = useSelector(({ posts }) => posts);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	if (!loading && !!error) {
		return <h1>{error}</h1>;
	}

	return (
		<div>
			<h1>Posts</h1>

			<section style={{ display: 'flex', gap: '1em' }}>
				<ul style={{ flexGrow: 0, flexShrink: 0, maxWidth: '30%' }}>
					{data.slice(0, 10).map(post => (
						<li key={post.id} style={{ marginBlock: '0.5em' }}>
							<NavLink to={`${post.id}`}>
								<strong>{post.title}</strong>
							</NavLink>
						</li>
					))}
				</ul>

				<Outlet />
			</section>
		</div>
	);
}

export default Posts;

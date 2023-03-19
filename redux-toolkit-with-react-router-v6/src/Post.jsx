import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
	const { id } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
			setPost(data);
		})();
	}, [id]);

	return !!post ? (
		<section>
			<h2>{post.title}</h2>
			<article>{post.body}</article>
		</section>
	) : null;
}

export default Post;

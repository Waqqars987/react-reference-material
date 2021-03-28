import { useRouter } from 'next/router';

function BlogPostsPage() {
	const router = useRouter();
	// gives an array of strings for all the different segments that were caught
	// when this component is loaded, blog page can be reached by multiple segments in the URL
	// as shown be the "[...slug]" syntax. Its a "Catch-All" path
	console.log('🚀 ~ BlogPostsPage ~ router', router.query);

	return (
		<div>
			<h1>The Blog Posts Page</h1>
		</div>
	);
}

export default BlogPostsPage;

import React, { Suspense } from 'react';

import { fetchProfileData } from './api';
import ErrorBoundary from './ErrorBoundary';

const resource = fetchProfileData();

function ProfilePage() {
	return (
		<ErrorBoundary>
			<Suspense fallback={<h1>Loading profile...</h1>}>
				<ProfileDetails />
				<Suspense fallback={<h1>Loading posts...</h1>}>
					<ProfileTimeline />
				</Suspense>
			</Suspense>
		</ErrorBoundary>
	);
}

function ProfileDetails() {
	const user = resource.user.read();
	return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
	const posts = resource.posts.read();
	return (
		<ul>
			{posts.map(post => (
				<li key={post.id}>{post.text}</li>
			))}
		</ul>
	);
}

function App() {
	return <ProfilePage />;
}

export default App;

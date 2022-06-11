export function fetchProfileData() {
	const userPromise = fetchUser();
	const postsPromise = fetchPosts();
	return {
		user: wrapPromise(userPromise),
		posts: wrapPromise(postsPromise),
	};
}

function wrapPromise(promise) {
	let status = 'pending';
	let result;
	const suspender = promise
		.then(r => {
			status = 'success';
			result = r;
		})
		.catch(e => {
			status = 'error';
			result = e;
		});

	return {
		read: () => {
			if (status === 'pending') {
				throw suspender;
			} else if (status === 'error') {
				throw result;
			} else if (status === 'success') {
				return result;
			}
		},
	};
}

function fetchUser() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				name: 'Ringo Starr',
			});
		}, 500);
	});
}

function fetchPosts() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve([
				{
					id: 0,
					text: 'I get by with a little help from my friends',
				},
				{
					id: 1,
					text: "I'd like to be under the sea in an octupus's garden",
				},
				{
					id: 2,
					text: 'You got that sand all over your feet',
				},
			]);
		}, 2000);
	});
}

import { renderToStaticMarkup } from 'react-dom/server';

export const Component = () => {
	const loaderString = renderToStaticMarkup(
		<img
			src='https://media.tenor.com/g6UyWxRljhwAAAAi/missing-head-mind-loading.gif'
			alt='Loading...'
		/>
	);
	// Errors out when remote app is served in production mode!
	return <div dangerouslySetInnerHTML={{ __html: loaderString }} />;
};

Component.displayName = 'Load';

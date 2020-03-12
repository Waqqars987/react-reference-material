import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
	render () {
		return (
			// <BrowserRouter basename="/my-app"> // 'basename' needs to be set if the app is served from a sub directory
			<BrowserRouter>
				<div className='App'>
					<Blog />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;

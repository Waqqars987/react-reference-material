import { Component } from 'react';

class ErrorBoundary extends Component {
	state = { error: null, errorInfo: null };

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		if (this.state.errorInfo) {
			return (
				<div>
					<h2>Something went wrong.</h2>

					<details style={{ whiteSpace: 'pre-wrap' }}>
						<summary>{this.state.error && this.state.error.toString()}</summary>

						<p>{this.state.errorInfo.componentStack}</p>
					</details>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

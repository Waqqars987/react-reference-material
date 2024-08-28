const { ModuleFederationPlugin } = require('webpack').container;
const { override, addWebpackPlugin } = require('customize-cra');

const { dependencies } = require('./package.json');

const publicPathPlugin = config => {
	config.output.publicPath = process.env.PUBLIC_PATH || '/';
	return config;
};

module.exports = override(
	publicPathPlugin,
	addWebpackPlugin(
		new ModuleFederationPlugin({
			name: 'host_app',
			filename: 'moduleEntry.js',
			remotes: {
				Remote: process.env.REMOTE_APP
			},
			shared: {
				...dependencies,
				react: {
					singleton: true,
					requiredVersion: dependencies['react']
				},
				'react-dom': {
					singleton: true,
					requiredVersion: dependencies['react-dom']
				}
			}
		})
	)
);

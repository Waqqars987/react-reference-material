const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const WebpackBar = require('webpackbar');
const path = require('path');

const dependencies = require('./package.json').dependencies;

module.exports = (_, { mode }) => {
	const isDevMode = mode !== 'production';
	const clientSideEnvVars = Object.keys(process.env).reduce((acc, key) => {
		if (key.startsWith('REACT_APP_')) acc[key] = process.env[key];
		return acc;
	}, {});
	const enableHmr = true; // Disable HMR for Federated Remotes

	return {
		output: {
			clean: true,
			publicPath: process.env.PUBLIC_PATH,
			path: path.join(__dirname, 'build'),
			filename: '[name].[contenthash].js',
			assetModuleFilename: '[name].[hash][ext][query]'
		},
		stats: isDevMode ? 'errors-warnings' : 'normal',
		resolve: {
			extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.json'],
			modules: ['node_modules', path.resolve(__dirname, 'src')]
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					exclude: /@babel(?:\/|\\{1,2})runtime/,
					test: /\.(js|mjs|jsx|ts|tsx|css)$/,
					loader: 'source-map-loader'
				},
				{
					oneOf: [
						{
							test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
							type: 'asset',
							parser: { dataUrlCondition: { maxSize: 10000 } }
						},
						{
							test: /\.svg$/i,
							use: [
								{
									loader: '@svgr/webpack',
									options: {
										prettier: false,
										svgo: false,
										svgoConfig: {
											plugins: [{ removeViewBox: false }]
										},
										titleProp: true,
										ref: true
									}
								},
								{
									loader: 'file-loader'
								}
							],
							issuer: {
								and: [/\.(ts|tsx|js|jsx|md|mdx)$/]
							}
						},
						{
							test: /\.(ts|tsx|js|jsx)$/,
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
									plugins: [
										['@babel/transform-runtime'],
										['@babel/plugin-proposal-private-property-in-object'],
										isDevMode && enableHmr && require.resolve('react-refresh/babel')
									].filter(Boolean),
									cacheDirectory: true,
									cacheCompression: false,
									compact: !isDevMode
								}
							}
						},
						{
							test: /\.m?js$/,
							type: 'javascript/auto',
							resolve: {
								fullySpecified: false
							}
						},
						{
							test: /\.css$/,
							exclude: /\.module\.css$/,
							use: [
								isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
								{
									loader: 'css-loader',
									options: {
										importLoaders: 1,
										sourceMap: true,
										modules: { mode: 'icss' }
									}
								},
								{
									loader: 'postcss-loader',
									options: {
										postcssOptions: {
											ident: 'postcss',
											config: false
										},
										sourceMap: true
									}
								}
							],
							sideEffects: true
						},
						{
							test: /\.module\.css$/,
							use: [
								isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
								{
									loader: 'css-loader',
									options: {
										importLoaders: 1,
										sourceMap: true,
										modules: {
											mode: 'local'
										}
									}
								},
								{
									loader: 'postcss-loader',
									options: {
										postcssOptions: {
											ident: 'postcss',
											config: false
										},
										sourceMap: true
									}
								}
							]
						},
						{
							test: /\.(scss|sass)$/,
							exclude: /\.module\.(scss|sass)$/,
							use: [
								isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
								{
									loader: 'css-loader',
									options: {
										importLoaders: 3,
										sourceMap: true,
										modules: { mode: 'icss' }
									}
								},
								{
									loader: 'postcss-loader',
									options: {
										postcssOptions: {
											ident: 'postcss',
											config: false
										},
										sourceMap: true
									}
								},
								{
									loader: 'resolve-url-loader',
									options: {
										sourceMap: true,
										root: path.resolve(__dirname, 'src')
									}
								},
								{
									loader: 'sass-loader',
									options: { sourceMap: true }
								}
							],
							sideEffects: true
						},
						{
							test: /\.module\.(scss|sass)$/,
							use: [
								isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
								{
									loader: 'css-loader',
									options: {
										importLoaders: 3,
										sourceMap: true,
										modules: {
											mode: 'local'
										}
									}
								},
								{
									loader: 'postcss-loader',
									options: {
										postcssOptions: {
											ident: 'postcss',
											config: false
										},
										sourceMap: true
									}
								},
								{
									loader: 'resolve-url-loader',
									options: {
										sourceMap: true,
										root: path.resolve(__dirname, 'src')
									}
								},
								{
									loader: 'sass-loader',
									options: { sourceMap: true }
								}
							]
						}
					]
				}
			]
		},
		plugins: [
			!isDevMode && new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
			new HtmlWebPackPlugin({ template: './public/index.html' }),
			new DefinePlugin({
				'process.env': JSON.stringify(clientSideEnvVars)
			}),
			new ModuleFederationPlugin({
				name: 'host_app',
				filename: 'moduleEntry.js',
				exposes: {},
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
			}),
			new ESLintPlugin({
				extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx']
			}),
			new WebpackBar(),
			isDevMode && enableHmr && new ReactRefreshWebpackPlugin({ overlay: false }),
			!isDevMode &&
				new CopyPlugin({
					patterns: [
						{
							from: 'public',
							to: '',
							globOptions: {
								ignore: ['**/index.html']
							}
						}
					]
				})
		].filter(Boolean),
		devServer: {
			open: true,
			hot: enableHmr,
			compress: true,
			liveReload: true,
			historyApiFallback: true,
			port: process.env.PORT || 3000,
			client: {
				logging: 'none',
				overlay: {
					errors: true,
					warnings: false,
					runtimeErrors: true
				}
			}
		}
	};
};

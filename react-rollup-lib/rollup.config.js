import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { sync } from 'glob';

export default {
	input: sync('src/**/index.js'),
	output: {
		dir: 'dist',
		format: 'es',
		sourcemap: true,
		compact: true,
		preserveModules: true,
		preserveModulesRoot: 'src',
	},
	watch: {
		exclude: 'node_modules/**',
	},
	plugins: [
		peerDepsExternal(),
		image(),
		postcss({
			minimize: true,
		}),
		nodeResolve({
			extensions: ['.js', '.jsx'],
			moduleDirectories: ['src', 'node_modules'],
		}),
		babel({
			babelHelpers: 'runtime',
			exclude: 'node_modules/**',
			plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
			presets: ['@babel/preset-react'],
		}),
	],
};

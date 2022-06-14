import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import { sync } from 'glob';

const isDevelopmentMode = process.env.ROLLUP_WATCH;

export default {
	input: sync('src/**/index.js'),
	output: {
		dir: 'dist',
		format: 'es',
		sourcemap: 'inline',
		compact: true,
		preserveModules: true,
		preserveModulesRoot: 'src'
	},
	watch: {
		exclude: 'node_modules/**'
	},
	plugins: [
		peerDepsExternal(),
		image({ dom: true }),
		postcss({
			minimize: true,
			sourceMap: 'inline',
			extract: 'styles.min.css'
		}),
		nodeResolve({
			extensions: ['.js', '.jsx'],
			moduleDirectories: ['src', 'node_modules'],
			browser: true,
			preferBuiltins: false
		}),
		babel({
			babelHelpers: 'runtime',
			exclude: 'node_modules/**',
			plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
			presets: ['@babel/preset-env', '@babel/preset-react']
		}),
		isDevelopmentMode ? false : terser()
	]
};

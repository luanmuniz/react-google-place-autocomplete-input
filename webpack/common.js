'use strict';

const { join } = require('path');

const paths = {
	dist: join(__dirname, '..', 'dist'),
	root: join(__dirname, '..'),
	src: join(__dirname, '..')
};

module.exports = {

	cssLoader: {
		include: paths.src,
		test: /\.css$/,
		use: [ 'style-loader', 'css-loader' ]
	},

	entry: {
		main: join(paths.src, 'index')
	},

	fileLoader: {
		include: paths.src,
		test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|txt)(\?.*)?$/,
		use: {
			loader: 'file-loader',
			options: {
				name: 'media/[name].[hash:8].[ext]'
			}
		}
	},

	jsLoader: {
		include: paths.src,
		test: /\.js$/,
		use: [ 'react-hot-loader/webpack', {
			loader: 'babel-loader',
			options: {
				plugins: [
					[ 'transform-runtime', {
						helpers: false,
						polyfill: false,
						regenerator: true
					}]
				],
				presets: [[ 'env', { modules: false }], 'stage-1', 'react' ]
			}
		}]
	},

	output: {
		filename: '[name].js',
		libraryExport: 'default',
		path: paths.dist
	},

	paths,

	resolve: {
		alias: {
			components: join(paths.src, 'components'),
			pages: join(paths.src, 'pages'),
			sections: join(paths.src, 'pages/sections'),
			src: paths.src,
			store: join(paths.src, 'store'),
			utils: join(paths.src, 'utils')
		}
	},

	urlLoader: {
		include: paths.src,
		test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
		use: {
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'media/[name].[hash:8].[ext]'
			}
		}
	}
};

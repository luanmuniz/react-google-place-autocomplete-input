'use strict';

const webpack = require('webpack');
const common = require('./common');

module.exports = {
	devtool: 'source-map',

	entry: common.entry.main,

	module: {
		rules: [
			common.jsLoader,
			common.fileLoader,
			common.urlLoader,
			{
				exclude: /node_modules/,
				loader: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap',
				test: /\.css$/
			}
		]
	},

	output: Object.assign({}, common.output, {
		filename: '[name].js',
		publicPath: ''
	}),

	plugins: [
		new webpack.NamedModulesPlugin()
	],

	resolve: common.resolve
};

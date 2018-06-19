'use strict';

const webpack = require('webpack');
const common = require('./common');

const CleanPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
	entry: common.entry,

	module: {
		rules: [
			common.jsLoader,
			common.fileLoader,
			common.urlLoader,
			common.cssLoader
		]
	},

	output: common.output,

	plugins: [
		new CleanPlugin([ 'dist' ], {
			root: common.paths.root
		}),

		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			}
		}),

		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		})
	].concat(
		process.env.ANALYZER ? new BundleAnalyzerPlugin() : [] // eslint-disable-line no-ternary
	),

	resolve: common.resolve
};

'use strict';

const webpack = require('webpack');
const common = require('./common');

const CleanPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');

module.exports = {
	entry: common.entry,

	module: {
		rules: [
			common.jsLoader,
			common.fileLoader,
			common.urlLoader,
			{
				loader: ExtractTextPlugin.extract(
					combineLoaders([{
						loader: 'css-loader',
						query: {
							localIdentName: '[name]__[local]___[hash:base64:5]',
							modules: true
						}
					}])
				),
				test: /\.css$/,
			}
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

		new ExtractTextPlugin('styles.css'),

		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		})
	].concat(
		process.env.ANALYZER ? new BundleAnalyzerPlugin() : [] // eslint-disable-line no-ternary
	),

	resolve: common.resolve
};

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');


var sassLoaders = ['css', 'postcss-loader', 'sass'];
var loaders = [
	{
		test: /\.js?/,
		exclude: /(node_modules|bower_components)/,
		loaders: ['babel'],
	},
	{
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
	}
];

module.exports = {
	entry: [
		'./src/app.jsx' // Your appʼs entry point
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	plugins: [
		new ExtractTextPlugin('[name].css')
	],
	postcss: [
		autoprefixer({
			browsers: ['last 4 versions'],
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.sass']
	},
	module: {
		loaders: loaders
	}
};

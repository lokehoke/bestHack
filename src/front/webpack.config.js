'use strict';

const Webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const path = require('path');
const { copyFileSync } = require('fs');

let config = {
	watch: false,
	devtool: 'source-map',
	mode: 'development',
	entry: {
		main: [
			'@babel/polyfill',
			'./scss/index.scss',
		    './js/index.jsx'
		]
	},
	output: {
		path: __dirname + '/../../public/resources/js/',
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: () => [autoprefixer()],
				    sourceMap: true
				}
			}, {
				loader: 'sass-loader', options: {
					sourceMap: true
				}
			}]
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/preset-react'
					],
					plugins: ['@babel/plugin-proposal-class-properties']
				}
			}
		}, {
			test: /\.png$/,
			use: [{
				loader: 'file-loader',
					options: {
					name: 'resources/img/[name].[ext]',
					context: ''
				}
			}]
		}]
	},
	resolve: {
		modules: ['node_modules']
	},
	plugins: [
		new Webpack.NoEmitOnErrorsPlugin(),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
                    copyFileSync(__dirname + '/../../public/resources/js/bundle.js',
                                 __dirname + '/../../src/server/public/resources/js/bundle.js')
                    copyFileSync(__dirname + '/../../public/resources/js/bundle.js.map',
                                 __dirname + '/../../src/server/public/resources/js/bundle.js.map')
                });
            }
        }
	]
};

module.exports = config;

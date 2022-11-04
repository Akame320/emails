const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copy = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.css|scss$/,
                use: [{loader: MiniCssExtractPlugin.loader}, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(js)$/, use: 'babel-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index_bundle.js"
    },
    plugins: [new webpack.EnvironmentPlugin({
        'NODE_END': 'development'
    }), new MiniCssExtractPlugin(),
        new copy({
            patterns: [
                { from: path.resolve(__dirname, 'src', 'pages'), to: path.resolve(__dirname, "dist") }
            ]
        })],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}
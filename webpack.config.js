const webpack = require('webpack');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');

module.exports = {
    entry: './browser/index.jsx', // assumes your entry point is the index.js in the root of your project folder
    output: {
        path: __dirname,
        filename: './public/bundle.js' // assumes your bundle.js will also be in the root of your project folder
    },
    resolve: { extensions: ['.scss', '.css', '.js', '.json'] },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015'] // if you aren't using 'babel-preset-es2015', then omit the 'es2015'
                }
            },
            {
                test: /\.scss?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css?$/, //for the sake of react-toolbox
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]--[local]--[hash:base64:8]'
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.html$/, //for html minification; if you take out minifier you must also take this test out
                loaders: [
                    'file-loader?name=[name].html',
                    'extract-loader',
                    'html-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new HtmlMinifierPlugin()
    ]
};
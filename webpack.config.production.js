const webpack = require('webpack');
require('babel-polyfill');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: ['babel-polyfill', './browser/index.jsx'], // assumes your entry point is the index.js in the root of your project folder
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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
};
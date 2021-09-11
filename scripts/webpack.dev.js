const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { PROJECT_PATH, SERVER_HOST, SREVER_PORT } = require('./config/constant');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(PROJECT_PATH, './dist'),
        publicPath: '/',
    },
    devServer: {
        bonjour: true,
        useLocalIp: true,
        host: SERVER_HOST,
        port: SREVER_PORT,
        stats: 'errors-only',
        clientLogLevel: 'none',
        compress: true,
        open: true,
        hot: true,
        noInfo: false,
        historyApiFallback: true,
    },
    optimization: {
        minimize: false,
        minimizer: [],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    target: 'web',
});

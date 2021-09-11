const path = require('path');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { PROJECT_PATH } = require('./config/constant');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    target: 'browserslist',
    output: {
        filename: 'js/[name].[contenthash:8].js',
        assetModuleFilename: 'assets/[name].[contenthash:8].[ext]',
        path: path.resolve(PROJECT_PATH, './dist'),
        publicPath: '/',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].chunk.css',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: { pure_funcs: ['debugger' /*'console.log'*/] },
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
        },
    },
});

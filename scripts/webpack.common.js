const path = require('path');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { PROJECT_PATH } = require('./config/constant');
const { isDevelopment, isProduction } = require('./config/env');

const LessModifyVars = require('../src/styles/modify.less');

const getCssLoaders = () => {
    const cssLoaders = [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: {
                    mode: 'local',
                    auto: true,
                    localIdentName: '[local]--[hash:base64:5]',
                },
                sourceMap: isDevelopment,
            },
        },
    ];
    isProduction &&
        cssLoaders.push({
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        isProduction && [
                            'postcss-preset-env',
                            {
                                autoprefixer: {
                                    grid: true,
                                },
                            },
                        ],
                    ],
                },
            },
        });
    return cssLoaders;
};

module.exports = {
    entry: {
        app: path.resolve(PROJECT_PATH, './src/index.tsx'),
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@public': path.resolve(PROJECT_PATH, './public'),
            '@src': path.resolve(PROJECT_PATH, './src'),
            '@views': path.resolve(PROJECT_PATH, './src/views'),
            '@layouts': path.resolve(PROJECT_PATH, './src/layouts'),
            '@components': path.resolve(PROJECT_PATH, './src/components'),
            '@plugins': path.resolve(PROJECT_PATH, './src/plugins'),
            '@custom': path.resolve(PROJECT_PATH, './src/custom'),
            '@typings': path.resolve(PROJECT_PATH, './src/typings'),
            '@utils': path.resolve(PROJECT_PATH, './src/utils'),
            '@service': path.resolve(PROJECT_PATH, './src/service'),
            '@store': path.resolve(PROJECT_PATH, './src/store'),
            '@assets': path.resolve(PROJECT_PATH, './src/assets'),
            '@styles': path.resolve(PROJECT_PATH, './src/styles'),
            '@mocks': path.resolve(PROJECT_PATH, './src/mocks'),
            '@report': path.resolve(PROJECT_PATH, './src/report'),
            '@test': path.resolve(PROJECT_PATH, './src/test'),
        },
    },

    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [...getCssLoaders()],
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoaders(),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: isDevelopment,
                            lessOptions: {
                                modifyVars: LessModifyVars,
                                javascriptEnabled: true,
                            },
                        },
                    },
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: path.resolve(PROJECT_PATH, './src/styles/vars.less'),
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoaders(),
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment,
                        },
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(PROJECT_PATH, './src/styles/vars.scss'),
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024,
                    },
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2?)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(PROJECT_PATH, './public/index.html'),
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: 'public/',
                    from: '**/*',
                    to: path.resolve(PROJECT_PATH, './dist'),
                    toType: 'dir',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: ['**/index.html'],
                    },
                },
            ],
        }),
        new WebpackBar({
            name: 'Link Webapck Inprogress.',
            color: '#52c41a',
        }),
    ],
};

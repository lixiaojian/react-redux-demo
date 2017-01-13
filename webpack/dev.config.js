/**
 * Created by xiaojianli on 2017/1/13.
 */
var path = require('path');
var webpack = require('webpack');
var autoprefix = require('auroprefix');

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var projectRootPath = path.resolve(__dirname,'../');
var assetsPath = path.resolve(projectRootPath,'./static/dist');

var config = require('../src/config');

module.exports = {
    devtool:'cheap-module-eval-source-map',
    context:projectRootPath,
    entry:[
        'webpack-hot-middleware/client?path=localhost:3001/__webpack_hmr',
        'bootstrap-loader',
        'font-awesome-loader!./src/theme/font-awesome/font-awesome.config.js',
        './src/client'
    ],
    output:{
        path:assetsPath,
        filename:'[name]-[hash].js',
        chunkFilename:'[name]-[chunkhash].js',
        publicPath:'http://'+config.host+':'+(config.port+1)+'/dist/'
    },
    progress:true,
    plugins:[
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __SERVER__ : false
        }),
        new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')).development()
    ],
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:'babel',
                exclude:/node_modules/,
                query:{
                    preset:['react-hmre']
                }
            },
            {
                test:/\.(jpeg|jpg|png|gif)$/,
                loader:'url-loader?limit=1024'
            },
            {
                test:/\.css$/,
                loaders:[
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
                    'postcss'
                ]
            },
            {
                test:/\.scss$/,
                loaders:[
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
                    'postcss',
                    'sass'
                ]
            },
            {
                test:/\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader:'url?limit=10000'
            },
            {
                test:/\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader:'file'
            }
        ]
    },
    postcss:[autoprefix({browswes:'last 2 versions'})]
}
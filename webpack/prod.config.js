/**
 * Created by xiaojianli on 2017/1/13.
 */
var path = require('path');
var webpack = require('webpack');
var autoprefix = require('auroprefix');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var projectRootPath = path.resolve(__dirname,'../');
var assetsPath = path.resolve(projectRootPath,'./static/dist');

// var config = require('../src/config');

module.exports = {
    devtool:'source-map',
    context:projectRootPath,
    entry:[
        'bootstrap-loader/extractStyles',
        'font-awesome-loader!./src/theme/font-awesome/font-awesome.config.prod.js',
        './src/client'
    ],
    output:{
        path:assetsPath,
        filename:'[name]-[chunkhash].js',
        chunkFilename:'[name]-[chunkhash].js',
        publicPath:'/dist/'
    },
    progress:true,
    plugins:[
        new ExtractTextPlugin('[name]-[chunkhash].css',{allChunk:true}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
           compress:{
               warnings:false
           }
        }),
        new webpack.DefinePlugin({
            'process.env':{
              NODE_ENV:'production'
            },
            __SERVER__ : false
        }),
        new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))
    ],
    module:{
        loaders:[
            {
                test:/\.(jpeg|jpg|png|gif)$/,
                loader:'url-loader?limit=1024'
            },
            {
                test:/\.css$/,
                loader:ExtractTextPlugin(
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss'
                )
            },
            {
                test:/\.scss$/,
                loader:ExtractTextPlugin(
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss!sass'
                )
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
let path = require('path')
let webpack = require('webpack')
let merge = require('webpack-merge')
let webpackBaseConfig = require('./webpack.base.conf')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(webpackBaseConfig, {
    entry: {
        main: [path.resolve(process.cwd(), 'src/entry-client.js')]
    },
    output: {
        publicPath: '/',
        filename: 'js/[name].[hash].js',
        path: path.resolve(process.cwd(), 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            'process.env.VUE_ENV': '"client"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return (/node_modules/.test(module.context) && !/\.css$/.test(module.request))
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new ExtractTextPlugin('css/[name].[hash:7].css'),
        new VueSSRClientPlugin()
    ]
})
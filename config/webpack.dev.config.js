const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const WebpackMerge = require('webpack-merge');
const path = require('./path');

const devConfig = WebpackMerge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        // DefinePlugin 是webpack 的内置插件，该插件可以在打包时候替换制定的变量
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"develop"'}//注意 '"develop"' 而不是 "develop"
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    // 启动服务器
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000'
        },
        contentBase: path.joinPath('../public'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
    },

});

module.exports = devConfig;
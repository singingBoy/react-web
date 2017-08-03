const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const WebpackMerge = require('webpack-merge');
const path = require('./path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = WebpackMerge(baseConfig, {
    devtool: '#cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'}//注意 '"develop"' 而不是 "develop"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{warning:true},
            sourceMap: false,
            mangle: false
        }),
        //压缩代码 TODO
        // new UglifyJSPlugin({
        //     uglifyOptions: {
        //         ie8: true,
        //         ecma: 8,
        //         compress: {
        //             sourceMap: false,
        //             mangle: false
        //         },
        //         warnings: false
        //     }
        // }),
        //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
        new webpack.HashedModuleIdsPlugin()
    ],

})
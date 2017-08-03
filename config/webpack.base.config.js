const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('./path')
const htmlWPHelper = require('./htmlWebpackPluginHelper');

const config = {
    //多入口
    entry: path.getFilesInfo(path.templateHtmlPath, '/**/*.js'),

    // 出口，publicPath浏览器需要引用输入出文件时， 这个配置项指定输入文件的公共URL地址
    output: {
        filename: '[name].js',
        path: path.resolvePath('../build'),
        publicPath: path.publicPath
    },
    // 其它解决方案配置（处理文件的扩展名）,用来配置依赖文件的匹配，
    // 如：依赖文件的别名配置、模块的查找目录、默认查找的
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.json', '.jsx', '.ts', 'tsx', '.scss', 'sass', 'less'],
        // modulesDirectories默认['web_modules','node_modules']
        // 解析目录名的一个数组到当前目录以及先前的目录，查找模块
        // modules: ['node_modules', path.join(__dirname, '../node_modules')]
        // 自定义搜索路径配置
        alias: {
            styles: path.joinPath('src/styles'),// 项目样式默认搜索路径配置
            images: path.joinPath('src/images')// 项目图片默认搜索路径配置
        },
    },
    // 针对loader的其他解决方案配置，loader的resolve（好像没啥用）
    resolveLoader: {
        moduleExtensions: ['*-loader'] // loader模版配置
    },
    //插件配置
    plugins: [
        /* 抽取出chunk的css */
        new ExtractTextPlugin({
            filename: "style/[name][hash:8].css",
            allChunks: true,
        }),
        /* 抽取出所有通用的部分*/
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            minChunks: 2,
        }),
        //当webpack加载到某个js模块里，出现了未定义且名称符合（字符串完全匹配）配置中key的变量时，会自动require配置中value所指定的js模块
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),

        // 热加载 添加HMR插件 | 对应启动参数 --hot
        new webpack.HotModuleReplacementPlugin(),
    ],
    // 用来进行模块加载相关的配置
    module: {
        rules: [{
            exclude: [
                /\.html$/,
                /\.(js|jsx)$/,
                /\.(css|less|sass|scss)$/,
                /\.json$/,
                /\.svg$/,
            ],
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'asset/[name].[hash:8].[ext]'
                }
            }]
        }, {
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            },{
                loader: 'expose-loader',
                options: '$'
            }]
        }, {
            test: /\.jsx?$/,
            use: {
                loader: 'babel-loader',
            },
            exclude: path.joinPath('../node_modules')
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({fallback: "style-loader", use: ['css-loader', 'postcss-loader']})
        }, {
            test: /\.(sass|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader', 'postcss-loader']
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader', 'postcss-loader']
            })
        }, {
            test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
            use: 'file-loader?prefix=font/&name=../font/[name].[ext]'
        }, {
            test: /\.svg$/,
            loader: 'file-loader?name=[name].[ext]',
        },]
    },
};

htmlWPHelper(path.getFilesInfo(path.templateHtmlPath, '/**/*.html'), config.plugins);

module.exports = config;
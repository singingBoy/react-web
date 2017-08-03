const path = require('./path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (htmlObj={}, plugins=[])=> {
    return Object.keys(htmlObj).map( filename => {
        const filePath = htmlObj[filename];
        plugins.push( new HtmlWebpackPlugin({
            filename: filePath.substring(filePath.lastIndexOf('/')+1, filePath.length),
            template: filePath,
            inject: 'body',
            chunks: ['commons', filename]
        }))
    });
}
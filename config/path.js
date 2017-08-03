/**
 * 路径模块
 * @author: wds
 * @createTime: 2017年7月28日
 * */
const {resolve, join} = require('path');
//用于匹配文件路径
const glob = require("glob");

//app根路径
const appDirectory = __dirname;

//默认发布路径
const publicPath = '/';

//返回到realtivePath位置,path.resolve相当于调用cd命令
const resolvePath = (relativePath) => {
    return resolve(appDirectory, relativePath);
}

//加入joinPath路径
const joinPath = (joinPath)=> {
    return join(appDirectory, joinPath);
}

//html模版路径
const templateHtmlPath = joinPath('../src/views');

/**
 * 返回匹配路径下所有文件的信息
 * @param: 文件路径, 匹配规则
 * @return: {fileName: filePath}
 */
const getFilesInfo = (path, regExp)=> {
    var info = {};
    glob.sync(path + regExp).forEach(filePath=> {
        info[filePath.substring(filePath.lastIndexOf('/')+1, filePath.lastIndexOf('.'))] = filePath;
    });
    console.dir(info)
    return info;
};

module.exports = {
    appDirectory,
    publicPath,
    templateHtmlPath,
    resolvePath,
    joinPath,
    getFilesInfo,
};
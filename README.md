#react web webpack
>前言：学习webpack构建web前端单页面、多页面框架，并进行一些封装，已完成基本使用。
(☻仅供大家参考共同学习，还有许多地方待优化，欢迎给予意见改进，不喜勿喷☻)

<hr/>
##Installation:

    npm install
    npm start
    npm run build //打包
    
##Usage:
&emsp;&emsp;由于知识水平限制，未能更好封装使用。
&emsp;&emsp;现已集成React、React-Redux、React-Router@4x、bootstrap(css、UI、插件)、全局jquery、 CSS 预处理语言less,sass等
<hr/>
> 期望使用项目结构(webpack构建根据此目录进行)

        |--build                                   // 打包目录
        |--config                                  // webpack配置文件
            --htmlWebpackPluginHelper.js           // 生成html模版工具
            --path.js                              // app路径
            --webpack.base.config.js               // webpack基本配置
            --webpack.base.dev.js                  // webpack开发模式
            --webpack.base.prod.js                 // webpack打包模式
        |--public                   // html引用静态资源
        |--src                      // 源码目录
            |--containers           // 容器目录
            |--images               // 图片资料目录
            |--models               // 模型目录
            |--services             // 请求目录
            |--styles               // 样式目录
            |--utils                // 工具目录
                 --appCreater.js    // app构建工具
            |--views                // 多页面目录
         --babelrc
         --package.json
         --postcss.config.js
         --README.md

<hr/>
> 使用

**Init 初始化**

        import React from 'react';
        import ReactDOM from 'react-dom';
        import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom'
        import createApp from '../../utils/appCreater';
        import App from '../../containers/index';
        import Login from '../../containers/login/login';
        
        //初始化
        const app = createApp();
        
        const router = (
            <Router >
                <div>
                    <Route exact path="/" component={App}/>
                    <Route path="/login" component={Login}/>
                </div>
            </Router>
        );
        
        //注册路由
        app.router(router)
        
        //注册models
        app.model(require('../../models/todo'))
        app.model(require('../../models/todo1'))
        
        //start
        app.start("root")

**model(封装rudux state、reducer)**

        module.exports = {
            namespace: 'todo',//命名空间
            state: { //初始值
                value: 0,
                flag: true
            },
            reducers: { //reducer
                success(state, action) {
                    console.log('success',action)
                    return { ...state, ...action.payload };
                }
            },
        };

**dispatch 一个 action**

    props.dispatch({type:'todo1/fail', payload:{value:1}});

**dispatch 一个异步 action**

    ...
    props.dispatch( hello({value:1}) );
    ...
    
    //helloService
    export default function hello( payload ) {
        return async(dispatch, getState, action) => {
            const data = await delay(1000)//请求
            dispatch({type:'todo/success', payload})
        }
    }

<hr/>

> webpack搭建：

    /************集成技术**************/
    "babel-runtime": "^6.25.0",
    "history": "^4.6.3",
    "jquery": "^3.2.1",
    "less": "^2.7.2",
    "precss": "^2.0.0",
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-redux": "^5.0.5",
    "react-router": "^4.1.2",
    "react-router-dom": "^4.1.2",
    "react-router-redux": "^5.0.0-alpha.6",
    "redux": "^3.7.2",
    "redux-logger": "^3.0.6",
    "redux-saga": "^0.15.6",
    "redux-thunk": "^2.2.0"
    
    /************构建工具**************/
    "babel-core": "^6.25.0",
    "babel-loader": "^7.1.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "babel-preset-stage-1": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "babel-preset-stage-3": "^6.24.1",
    "css-loader": "^0.28.4",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^0.11.2",
    "expose-loader": "^0.7.3",
    "glob": "^7.1.2",
    "html-webpack-plugin": "^2.29.0",
    "json-loader": "^0.5.7",
    "less-loader": "^4.0.5",
    "postcss": "^6.0.8",
    "postcss-loader": "^2.0.6",
    "style-loader": "^0.18.2",
    "url-loader": "^0.5.9",
    "uglifyjs-webpack-plugin": "^0.4.6",
    "webpack": "^3.3.0",
    "webpack-dev-server": "^2.5.1",
    "webpack-merge": "^4.1.0"

    
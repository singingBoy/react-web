/**
 * Created by Administrator on 2017/7/24.
 */
import React from 'react';
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
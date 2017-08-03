/**
 * Created by Administrator on 2017/7/24.
 */
import React from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom'
import '../../styles/index.less'
import '../../styles/index.css'
const img1 = require('../../images/test.png')
import { connect } from 'react-redux';
import hello from '../../services/helloService'

var App = (props) => {
    console.log('props',props)
    const onClick = ()=>{
        console.log('点击了Hello word!')
        props.dispatch({type:'todo1/fail', payload:{value:1}});
        props.dispatch(hello({value:1}));
    }

    return (
        <div >
            <a href="./login.html" className="title2">多页面转跳login</a><br/>
            <Link to="/login">路由Link转跳Login</Link><br/>
            <NavLink to="/login">路由NavLink转跳Login</NavLink><br/>
            <a onClick={
                ()=>props.history.push('/login')
                //()=>props.dispatch(push('/login'))

            }>
                dispatch跳转login
            </a>

            <h4 className="title">Welcome</h4>
            <img src={img1} alt="img"/>

            {/*bootstrap引入测试*/}
            <div className="container">
                <h1 onClick={onClick}>Hello, world!</h1>
                <div className="row">
                    <div className="col-xs-6 col-md-offset-3"
                         style={{backgroundColor: '#dedef8',boxShadow:'inset 1px -1px 1px #444, inset -1px 1px 1px #444'}}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                        </p>
                    </div>
                </div>
            </div>
            <div className="dropdown">
                <button type="button" className="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown">主题
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    <li role="presentation">
                        <a role="menuitem" tabIndex="-1" href="#">Java</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabIndex="-1" href="#">数据挖掘</a>
                    </li>
                    <li role="presentation">
                        <a role="menuitem" tabIndex="-1" href="#">数据通信/网络</a>
                    </li>
                    <li role="presentation" className="divider"></li>
                    <li role="presentation">
                        <a role="menuitem" tabIndex="-1" href="#">分离的链接</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

App = connect(({todo,todo1})=>({todo,todo1}))(App)

export default App;
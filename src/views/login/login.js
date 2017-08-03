/**
 * Created by Administrator on 2017/7/24.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/index.less'
import '../../styles/index.css'
const img1 = require('../../images/test.png')
const App = () => {
    return (
        <div>
            <h3 className="title2">Login</h3>
            <img src={img1} alt="img"/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById("root"));
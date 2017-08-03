import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';
import logger from 'redux-logger'


// 使用rudux-sagas失败
const _sagesMap = [], _sages = [], _watcher = [];


const createApp = ()=> {
    const app = {
        /************************
         * 属性
         *************************/
        _router: null,
        _store: null,
        _reducers: {},//各模块的reducer--{namespace: func}

        /************************
         * 方法
         *************************/
        //启动
        start: (domId)=> {
            // Create a history of your choosing (we're using a browser history in this case)
            const history = createHistory()
            // Build the middleware for intercepting and dispatching navigation actions
            const middleware = routerMiddleware(history)
            if (Object.keys(app._reducers).length != 0) {
                app._store = createStore(
                    combineReducers({
                        ...app._reducers,
                        router: routerReducer
                    }),
                    applyMiddleware(thunk, logger, middleware)
                );
                //连接saga、action
                // if (_sagesMap.length > 0)
                //     startSaga();
            }
            ReactDOM.render(
                app._store ?
                    <Provider store={app._store}>
                        <ConnectedRouter history={history}>
                            {app._router}
                        </ConnectedRouter>
                    </Provider> :
                    <div>
                        {app._router}
                    </div>,
                document.getElementById(domId)
            );
        },

        //注册路由
        router: (router)=> {
            app._router = router;
        },

        //注册model
        model: (model)=> {
            //用namespace并构actions作用域,state默认状态,effects异步,reducers处理
            const {namespace, state, effects, reducers} = model;
            Object.assign(app._reducers, {[namespace]: createReducer(state, reducers, namespace)});
            //组装effects
            // createSaga(effects, namespace)
        }
    }
    return app;
};

/*创建reducer函数*/
const createReducer = (initialState, reducers, namespace) => {
    const handlers = {};
    //加入namespace限制
    Object.keys(reducers).map( key=>
        handlers[`${namespace}/${key}`] = reducers[key]
    );
    return function reducer(state = initialState, action) {
        return handlers[action.type] ? handlers[action.type](state, action) : state;
    }
}

/**创建异步redux入口**/
const createThunk = (handlers) => {
    return function reducer( handlers, action ) {
        return async(dispatch, getState) => {
            handlers[action.type](dispatch, getState, action);
        }
    }
}

export default createApp;
import {delay} from '../utils/common';

export default function hello( payload ) {
    return async(dispatch, getState, action) => {
        const data = await delay(1000)//请求
        dispatch({type:'todo/success', payload})
    }
}


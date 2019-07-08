import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';



const logger = store => next => action => {
    console.log(action.type);
    //向web控制台输出一个通知信息。在Firefox和Chrome中，web控制台的日志中的项目旁边会显示一个小的‘I‘图标
    console.info('dispatching',action);
    //next() 方法返回一个包含属性 done 和 value 的对象。该方法也可以通过接受一个参数用以向生成器传值。
    let result = next(action);
    console.log('next state', store.getState());
    //使用 console.groupEnd() 方法来结束一个分组信
    console.groupEnd(action.type);
    return result;
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger)
    )
);


// 将store 传递给应用组件，现在应用将接收 store 作为 props
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

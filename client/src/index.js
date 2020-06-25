import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'

import Reducer from './_reducers/index'

const creatStoreMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
// 그냥 store는 promise, function을 못받기 때문에 middleware로 두 패키지를 연결한 createStore로 만든 스토어를 사용

ReactDOM.render(
  <Provider store={creatStoreMiddleware(Reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

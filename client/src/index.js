import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css'

import {Provider} from'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from'redux-promise';
import ReduxThunk from 'redux-thunk';

//리듀서를 모아둔 combind파일을 가져온다.
import Reducer from './_reducers/Combind'

//스토어가 object 가아닌 다른 형식(promis, function)의 데이터도 받을수 있도록하는 미들웨어
const StoreWithMiddleware=applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

//미들웨어를 정해주고 store을 만들어준뒤 Provider에 넣어준다.
ReactDOM.render(
  <Provider 
    store={StoreWithMiddleware(Reducer,
      //크롬에서 확장프로그램인 리더스 툴을 이용하기 위한 코드
    window.__REDUX_DEVTOOLS_EXTENSION__&&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

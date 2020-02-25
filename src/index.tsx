import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import rootSagas from './store/sagas';
import {Provider} from 'react-redux';
import rootReducer from './store';
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from '@redux-saga/core';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
   rootReducer,
   composeWithDevTools(
      applyMiddleware(sagaMiddleware)
   )
);

sagaMiddleware.run(rootSagas);

ReactDOM.render(
   <Provider store={store}>
      <App/>
   </Provider>,
   document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

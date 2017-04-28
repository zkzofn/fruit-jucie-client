import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import reducers from './reducers';
import promise from 'redux-promise';
import Home from './components/Home'

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

const customHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={customHistory}>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </Router>

  </Provider>
  , document.querySelector('.container'));

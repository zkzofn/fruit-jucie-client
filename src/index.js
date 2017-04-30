import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import promise from 'redux-promise';

import reducers from './reducers';
import Header from './containers/header/index'
import Body from './containers/body/index'
import Footer from './containers/footer/index'

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

const customHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
      <Router history={customHistory}>
        <div>
          <Header />
          <Body />
          <Footer />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));

// <Route exact path="/" component={Index}/>
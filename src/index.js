import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import promise from 'redux-promise';

import reducers from './reducers';

import Header from './containers/Header';
import Home from './containers/Home';
import Footer from './containers/Footer';
import Items from './components/Items';

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
          <Route exact path="/" component={Home} />
          <Route path="/items" component={Items} />
          <Footer />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('#main'));


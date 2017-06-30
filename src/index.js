import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import promise from 'redux-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from './reducers';

import Header from './containers/Header';
import Home from './containers/Home';
import Footer from './containers/Footer';
import Items from './components/Items';
import SignIn from './components/SignIn';
import ItemDetail from './components/ItemDetail';

injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

const customHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={customHistory}>
      <MuiThemeProvider>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/item" component={ItemDetail} />
          <Route path="/items" component={Items} />
          <Route path="/signin" component={SignIn} />
          <Footer />
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>
  , document.querySelector('#main'));


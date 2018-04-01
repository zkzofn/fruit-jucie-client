import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import promise from 'redux-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from './reducers';
import Header from './containers/Header';
import Home from './containers/Home';
import Footer from './containers/Footer';
import Shop from './containers/Shop';
import Item from './components/Item';

import Products from './components/Products';
import SignIn from './components/SignIn';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Order from './components/Order';
import Payment from './components/Payment';
import MyOrder from './components/MyOrder';

injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

const customHistory = createBrowserHistory();


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={customHistory}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <div>
            <Route path="*" component={Header} />
          </div>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop/:productId" component={Item} />
          <Route exact path="/shop" component={Shop} />
          <Route path="/product/:productId" component={ProductDetail} />
          <Route path="/products" component={Products} />
          <Route path="/signin" component={SignIn} />
          <Route path="/cart" component={Cart} />
          <Route path="/order" component={Order} />
          <Route path="/payment" component={Payment} />
          <Route path="/my/order" component={MyOrder} />
          <Footer />
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>
  , document.querySelector('#main'));


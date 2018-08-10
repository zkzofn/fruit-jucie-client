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
import Home from './containers/Home/index';
import Footer from './containers/Footer';
import Shop from './containers/Shop';
import Admin from './containers/Admin';

import Item from './components/Item';
import Products from './components/Products';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Order from './components/Order';
import Payment from './components/Payment';
import MyPage from './components/MyPage';
import AdminProductEdit from './components/Admin/AdminEditProduct'

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
          <Route path="/signup" component={SignUp} />
          <Route path="/cart" component={Cart} />
          <Route path="/order" component={Order} />
          <Route path="/payment" component={Payment} />
          <Route path="/myPage" component={MyPage} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin/products/edit/:productId" component={AdminProductEdit} />
          <Footer />
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>
  , document.querySelector('#main'));


import { combineReducers } from 'redux';
import UserReducer from './ReducerUser';
import ValidateReducer from './ReducerValidate';
import AddressListReducer from './ReducerAddressList';
import ProductReducer from './ReducerProduct';
import MyOrderListReducer from './ReducerMyOrderList';

const rootReducer = combineReducers({
  user: UserReducer,
  validate: ValidateReducer,
  addressList: AddressListReducer,
  product: ProductReducer,
  myOrderList: MyOrderListReducer
});

export default rootReducer;

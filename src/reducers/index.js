import { combineReducers } from 'redux';
import UserReducer from './ReducerUser';
import ValidateReducer from './ReducerValidate';
import AddressListReducer from './ReducerAddressList';
import ProductReducer from './ReducerProduct';
import CountReducer from './ReducerCount';

const rootReducer = combineReducers({
  user: UserReducer,
  validate: ValidateReducer,
  addressList: AddressListReducer,
  product: ProductReducer,
  count: CountReducer
});

export default rootReducer;

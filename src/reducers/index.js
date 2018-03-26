import { combineReducers } from 'redux';
import UserReducer from './ReducerUser';
import ValidateReducer from './ReducerValidate';
import AddressListReducer from './ReducerAddressList';

const rootReducer = combineReducers({
  user: UserReducer,
  validate: ValidateReducer,
  addressList: AddressListReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import UserReducer from './ReducerUser';
import ValidateReducer from './ReducerValidate';

const rootReducer = combineReducers({
  user: UserReducer,
  validate: ValidateReducer
});

export default rootReducer;

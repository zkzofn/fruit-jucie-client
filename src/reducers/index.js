import { combineReducers } from 'redux';
import CurrentReducer from './ReducerCurrent';
import ValidateReducer from './ReducerValidate';

const rootReducer = combineReducers({
  current: CurrentReducer,
  validate: ValidateReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import CurrentReducer from './ReducerCurrent';

const rootReducer = combineReducers({
  current: CurrentReducer,
});

export default rootReducer;

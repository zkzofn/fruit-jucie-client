import { combineReducers } from 'redux';
import CurrentUserReducer from './ReducerCurrentUser';

const rootReducer = combineReducers({
  currentUser: CurrentUserReducer,
});

export default rootReducer;

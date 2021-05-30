import { combineReducers } from 'redux';
import authReducer from './auth/authReducers';

const rootReducer = combineReducers({
  authStore: authReducer,
});

export default rootReducer;

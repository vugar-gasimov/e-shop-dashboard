import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer';
import categoryReducer from './Reducers/categoryReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
});

export default rootReducer;

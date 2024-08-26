import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer';
import categoryReducer from './Reducers/categoryReducer';
import productReducer from './Reducers/productReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  products: productReducer,
});

export default rootReducer;

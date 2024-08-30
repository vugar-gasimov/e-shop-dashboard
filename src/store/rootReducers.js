import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer';
import categoryReducer from './Reducers/categoryReducer';
import productReducer from './Reducers/productReducer';
import vendorReducer from './Reducers/vendorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  products: productReducer,
  vendors: vendorReducer,
});

export default rootReducer;

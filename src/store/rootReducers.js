import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer';
import categoryReducer from './Reducers/categoryReducer';
import productReducer from './Reducers/productReducer';
import vendorReducer from './Reducers/vendorReducer';
import chatReducer from './Reducers/chatReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  products: productReducer,
  vendors: vendorReducer,
  vendor_chat: chatReducer,
});

export default rootReducer;

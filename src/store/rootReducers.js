import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer';
import categoryReducer from './Reducers/categoryReducer';
import productReducer from './Reducers/productReducer';
import vendorReducer from './Reducers/vendorReducer';
import chatReducer from './Reducers/chatReducer';
import orderReducer from './Reducers/orderReducer';
import paymentReducer from './Reducers/paymentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  products: productReducer,
  vendors: vendorReducer,
  vendor_chat: chatReducer,
  order: orderReducer,
  payment: paymentReducer,
});

export default rootReducer;

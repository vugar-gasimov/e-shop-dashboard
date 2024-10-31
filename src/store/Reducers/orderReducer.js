import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const get_admin_orders = createAsyncThunk(
  'order/get_admin_orders',
  async (
    { page, perPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/admin/get-orders?page=${page}&searchValue=${searchValue}&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'An error occurred' }
      );
    }
  }
); // End of get admin orders method.

export const get_admin_order = createAsyncThunk(
  'order/get_admin_order',
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-order/${orderId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'An error occurred' }
      );
    }
  }
); // End of get admin order method.

export const adminUpdateOrderStatus = createAsyncThunk(
  'order/adminUpdateOrderStatus',
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/admin/update/order-status/${orderId}`,
        info,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'An error occurred' }
      );
    }
  }
); // End of admin update order status method.

export const get_vendor_orders = createAsyncThunk(
  'order/get_vendor_orders',
  async (
    { page, perPage, searchValue, vendorId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/vendor/get-orders/${vendorId}?page=${page}&searchValue=${searchValue}&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'An error occurred' }
      );
    }
  }
); // End of get vendor orders method.

export const get_vendor_order = createAsyncThunk(
  'order/get_vendor_order',
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/vendor/get-order/${orderId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'An error occurred' }
      );
    }
  }
); // End of get vendor order method.

const initialState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  myOrders: [],
  order: {},
  totalOrders: 0,
};

export const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearMessages: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_admin_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrders = payload.totalOrders;
        // state.successMessage = payload.message;
      })
      .addCase(get_admin_order.fulfilled, (state, { payload }) => {
        state.order = payload.order;
        state.successMessage = payload.message;
      })
      .addCase(adminUpdateOrderStatus.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })
      .addCase(adminUpdateOrderStatus.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(get_vendor_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrders = payload.totalOrders;
        // state.successMessage = payload.message;
      })
      .addCase(get_vendor_order.fulfilled, (state, { payload }) => {
        state.order = payload.order;
        state.successMessage = payload.message;
      });
  },
});

export const { clearMessages } = orderReducer.actions;
export default orderReducer.reducer;

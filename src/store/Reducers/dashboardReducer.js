import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const get_admin_dashboard = createAsyncThunk(
  'dashboard/get_admin_dashboard',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/admin/get-dashboard', {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
); // End of get admin dashboard method

export const get_vendor_dashboard = createAsyncThunk(
  'dashboard/get_vendor_dashboard',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/vendor/get-dashboard', {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
); // End of get vendor dashboard method

const initialState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  totalSales: 0,
  totalOrders: 0,
  totalProducts: 0,
  totalPendingOrders: 0,
  totalVendors: 0,
  recentOrders: [],
  recentMessages: [],
};

export const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearMessages: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_admin_dashboard.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_admin_dashboard.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage =
          payload.message || 'Admin dashboard data fetched successful!';
        state.totalSales = payload.totalSales;
        state.totalProducts = payload.totalProducts;
        state.totalOrders = payload.totalOrders;
        state.totalVendors = payload.totalVendors;
        state.recentMessages = payload.chatMessages;
        state.recentOrders = payload.recentOrders;
      })
      .addCase(get_admin_dashboard.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage =
          payload.message || 'Failed to fetch admin dashboard data.';
      }) // End of admin dashboard

      .addCase(get_vendor_dashboard.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_vendor_dashboard.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage =
          payload.message || 'Vendor dashboard data fetched successful!';
        state.totalSales = payload.totalSales;
        state.totalProducts = payload.totalProducts;
        state.totalOrders = payload.totalOrders;
        state.recentOrders = payload.recentOrders;
        state.recentMessages = payload.recentMessages;
        state.totalPendingOrders = payload.totalPendingOrders;
      })
      .addCase(get_vendor_dashboard.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage =
          payload.message || 'Failed to fetch vendor dashboard data.';
      }); // End of vendor dashboard
  },
});

export const { clearMessages } = dashboardReducer.actions;
export default dashboardReducer.reducer;

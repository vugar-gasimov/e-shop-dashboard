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
);

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
      .addCase(get_admin_dashboard.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage =
          payload.message || 'Failed to fetch admin dashboard data.';
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
      });
  },
});

export const { clearMessages } = dashboardReducer.actions;
export default dashboardReducer.reducer;

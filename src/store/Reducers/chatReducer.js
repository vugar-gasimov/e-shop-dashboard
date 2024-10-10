import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const get_customers = createAsyncThunk(
  'vendor_chat/get_customers',
  async (vendorId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/vendor/get-customers/${vendorId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
); // End of Add Profile Info method

export const chatReducer = createSlice({
  name: 'vendor_chat',
  initialState: {
    successMessage: '',
    errorMessage: '',
    customers: [],
    messages: [],
    activeCustomer: [],
    activeVendor: [],
    activeAdmin: [],
    friends: [],
    vendor_admin_messages: [],
    currentVendor: {},
    currentCustomer: {},
    vendors: [],
  },
  reducers: {
    clearMessages: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_customers.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage =
        payload.message || 'Customers fetched successfully';
      state.customers = payload.customers;
    });
  },
});

export const { clearMessages } = chatReducer.actions;
export default chatReducer.reducer;

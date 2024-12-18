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
      return rejectWithValue(
        error.response?.data || 'Failed to fetch customers'
      );
    }
  }
); // End of get customers chat messages method

export const get_customer_message = createAsyncThunk(
  'vendor_chat/get_customer_message',
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/chat/vendor/get-customer-message/${customerId}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch messages'
      );
    }
  }
); // End of get customer message method

export const send_message_customer = createAsyncThunk(
  'vendor_chat/send_message_customer',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/chat/vendor/send-message-customer`,
        info,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to send message');
    }
  }
); // End of send message to customer method

export const get_vendors = createAsyncThunk(
  'vendor_chat/get_vendors',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/admin/get-vendors`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to get vendors');
    }
  }
); // End of get vendors method

export const send_admin_message = createAsyncThunk(
  'vendor_chat/send_admin_message',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/chat/send-admin-message`, info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to send admin message.'
      );
    }
  }
); // End of send admin message method

export const get_admin_messages = createAsyncThunk(
  'vendor_chat/get_admin_messages',
  async (receiverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-admin-messages/${receiverId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to get admin messages.'
      );
    }
  }
); // End of get admin messages method

export const get_vendor_messages = createAsyncThunk(
  'vendor_chat/get_vendor_messages',
  async (receiverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-vendor-messages`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to get admin messages.'
      );
    }
  }
); // End of get vendor messages method

export const chatReducer = createSlice({
  name: 'vendor_chat',
  initialState: {
    messages: [],
    errorMessage: '',
    successMessage: '',
    admin_vendor_messages: [],
    activeCustomer: [],
    activeVendor: [],
    activeAdmin: [],
    currentVendor: {},
    currentCustomer: {},
    friends: [],
    vendors: [],
    customers: [],
  },
  reducers: {
    clearMessages: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
    updateMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    updateVendors: (state, { payload }) => {
      state.activeVendor = payload;
    },
    updateCustomers: (state, { payload }) => {
      state.activeCustomer = payload;
    },
    updateAdminMessage: (state, { payload }) => {
      state.admin_vendor_messages = [...state.admin_vendor_messages, payload];
    },
    updateVendorMessage: (state, { payload }) => {
      state.admin_vendor_messages = [...state.admin_vendor_messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_customers.fulfilled, (state, { payload }) => {
        state.successMessage =
          payload.message || 'Customers fetched successfully';
        state.customers = payload.customers;
      })
      .addCase(get_customer_message.fulfilled, (state, { payload }) => {
        state.successMessage =
          payload.message || 'Customer message fetched successfully';
        state.messages = payload.messages;
        state.currentCustomer = payload.currentCustomer;
      })
      .addCase(send_message_customer.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message || 'Message posted successfully';
        let tempFriends = state.customers;
        let friendIndex = tempFriends.findIndex(
          (f) => f.fdId === payload.newMessage.receiverId
        );
        while (friendIndex > 0) {
          let temp = tempFriends[friendIndex];
          tempFriends[friendIndex] = tempFriends[friendIndex - 1];
          tempFriends[friendIndex - 1] = temp;
          friendIndex--;
        }
        state.customers = tempFriends || [];
        state.messages = [...state.messages, payload.newMessage] || [];
      })
      .addCase(get_vendors.fulfilled, (state, { payload }) => {
        state.successMessage =
          payload.message || 'Vendors fetched successfully';
        state.vendors = payload.vendors;
      })
      .addCase(send_admin_message.fulfilled, (state, { payload }) => {
        state.successMessage =
          payload.message || 'Admin message sent successfully';
        state.admin_vendor_messages = [
          ...state.admin_vendor_messages,
          payload.data,
        ];
      })
      .addCase(get_admin_messages.fulfilled, (state, { payload }) => {
        state.successMessage =
          payload.message || 'Customer message fetched successfully';
        state.admin_vendor_messages = payload.messages;
        state.currentVendor = payload.currentVendor;
      })
      .addCase(get_vendor_messages.fulfilled, (state, { payload }) => {
        state.successMessage =
          payload.message || 'Customer message fetched successfully';
        state.admin_vendor_messages = payload.messages;
      });
  },
});

export const {
  clearMessages,
  updateMessage,
  updateVendors,
  updateCustomers,
  updateAdminMessage,
  updateVendorMessage,
} = chatReducer.actions;
export default chatReducer.reducer;

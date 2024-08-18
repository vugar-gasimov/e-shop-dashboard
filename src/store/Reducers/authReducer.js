import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

const initialState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  userInfo: null,
};

export const admin_login = createAsyncThunk(
  'auth/admin_login',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/admin-login', info, {
        withCredentials: true,
      });
      localStorage.setItem('accessToken', data.token);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const vendor_register = createAsyncThunk(
  'auth/vendor_register',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await api.post('/vendor-register', info, {
        withCredentials: true,
      });
      // localStorage.setItem('accessToken', data.token);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearMessages: (state, payload) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state, { payload }) => {
        state.loader = true;
        // state.successMessage = '';
        // state.errorMessage = '';
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'Login failed.';
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message || 'Login successful!';
        state.userInfo = payload.user;
      });
  },
});

export const { clearMessages } = authReducer.actions;
export default authReducer.reducer;

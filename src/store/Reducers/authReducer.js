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
  async (info) => {
    console.log(info);
    try {
      const { data } = await api.post('/admin-login', info, {
        withCredentials: true,
      });
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
  }
);

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authReducer.reducer;

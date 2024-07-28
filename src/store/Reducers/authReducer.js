import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  userInfo: null,
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authReducer.reducer;

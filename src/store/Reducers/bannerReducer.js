import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const add_banner = createAsyncThunk(
  'banner/add_banner',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/add/banner`, info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'An error occurred' }
      );
    }
  }
); // End of get Vendor method.

const initialState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  banners: [],
  banner: '',
};

export const bannerReducer = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    clearMessages: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_banner.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(add_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message || 'An error occurred';
      });
  },
});

export const { clearMessages } = bannerReducer.actions;
export default bannerReducer.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

// Utility function to handle errors
const handleError = (error) =>
  error.response?.data || { error: 'An error occurred' };

export const add_banner = createAsyncThunk(
  'banner/add_banner',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/add/banner`, info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
); // End of add banner by product id method.

export const get_banner = createAsyncThunk(
  'banner/get_banner',
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get/banner/${productId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
); // End of get banner by product id method.

export const update_banner = createAsyncThunk(
  'banner/update_banner',
  async ({ bannerId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/update/banner/${bannerId}`, info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
); // End of update banner by product id method.

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
    clearMessages: (state) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loader = true;
      state.errorMessage = '';
    };
    const handleFulfilled = (state, { payload }) => {
      state.loader = false;
      state.banner = payload.banner;
      state.successMessage = payload.message;
    };
    const handleRejected = (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload?.message || 'An error occurred';
    };
    builder
      .addCase(add_banner.pending, handlePending)
      .addCase(add_banner.fulfilled, handleFulfilled)
      .addCase(add_banner.rejected, handleRejected)
      .addCase(get_banner.fulfilled, handleFulfilled)
      .addCase(update_banner.pending, handlePending)
      .addCase(update_banner.fulfilled, handleFulfilled)
      .addCase(update_banner.rejected, handleRejected);
  },
});

export const { clearMessages } = bannerReducer.actions;
export default bannerReducer.reducer;

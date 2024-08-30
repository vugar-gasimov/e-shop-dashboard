import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const getVendors = createAsyncThunk(
  'vendors/getVendors',
  async (
    { page, perPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-vendors?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
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
); // End of getCategories method.

const initialState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  textLoader: false,
  vendors: [],
  totalVendors: 0,
};

export const vendorReducer = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    clearMessages: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getVendors.pending, (state, { payload }) => {
        state.textLoader = true;
      })
      .addCase(getVendors.rejected, (state, { payload }) => {
        state.textLoader = false;
        state.errorMessage = payload.error || 'An error occurred';
      })
      .addCase(getVendors.fulfilled, (state, { payload }) => {
        state.textLoader = false;
        state.totalVendors = payload.totalVendors;
        state.successMessage = payload.message;
        state.vendors = payload.vendors;
      });
  },
});

export const { clearMessages } = vendorReducer.actions;
export default vendorReducer.reducer;

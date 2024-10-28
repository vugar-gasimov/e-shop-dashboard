import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const getVendor = createAsyncThunk(
  'vendors/getVendor',
  async (vendorId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-vendor/${vendorId}`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'An error occurred' }
      );
    }
  }
); // End of get Vendor method.

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
); // End of get Vendors method.

export const updateVendorStatus = createAsyncThunk(
  'vendors/updateVendorStatus',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/update-vendor-status`, info, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'An error occurred' }
      );
    }
  }
); // End of update Vendor Status method.

export const get_activeVendors = createAsyncThunk(
  'vendors/get_activeVendors',
  async (
    { page, perPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-active-vendors?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
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
); // End of get active Vendors method.

export const get_deactiveVendors = createAsyncThunk(
  'vendors/get_deactiveVendors',
  async (
    { page, perPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-deactive-vendors?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
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
); // End of get deactive Vendors method.

const initialState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  textLoader: false,
  vendor: '',
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
      })
      .addCase(getVendor.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getVendor.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'An error occurred';
      })
      .addCase(getVendor.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.vendor = payload.vendor;
      })
      .addCase(updateVendorStatus.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateVendorStatus.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'An error occurred';
      })
      .addCase(updateVendorStatus.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.vendor = payload.vendor;
      })
      .addCase(get_activeVendors.fulfilled, (state, { payload }) => {
        state.vendors = payload.vendors;
        state.totalVendors = payload.totalVendors;
      })
      .addCase(get_deactiveVendors.fulfilled, (state, { payload }) => {
        state.vendors = payload.vendors;
        state.totalVendors = payload.totalVendors;
      });
  },
});

export const { clearMessages } = vendorReducer.actions;
export default vendorReducer.reducer;

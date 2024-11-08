import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const vendor_payment_details = createAsyncThunk(
  'payment/vendor_payment_details',
  async (vendorId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/payment/vendor-payment-details/${vendorId}`,

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
); // End of get vendor payment details method.

const initialState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  pendingWithdraws: [],
  successWithdraws: [],
  totalAmount: 0,
  withdrawAmount: 0,
  pendingAmount: 0,
  availableAmount: 0,
};

export const paymentReducer = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearMessages: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      //   .addCase(active_stripe_connect_account.pending, (state, { payload }) => {
      //     state.loader = true;
      //   })
      .addCase(vendor_payment_details.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      });
    //   .addCase(active_stripe_connect_account.rejected, (state, { payload }) => {
    //     state.loader = false;
    //     state.errorMessage = payload.message;
    //   });
  },
});

export const { clearMessages } = paymentReducer.actions;
export default paymentReducer.reducer;

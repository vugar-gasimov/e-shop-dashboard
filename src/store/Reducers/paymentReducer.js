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

export const send_withdrawal_request = createAsyncThunk(
  'payment/send_withdrawal_request',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/payment/withdrawal-request', info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); // End of send withdrawal request method

export const get_payment_request = createAsyncThunk(
  'payment/get_payment_request',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/payment/get-request', {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); // End of get payment request method

export const confirm_payment_request = createAsyncThunk(
  'payment/confirm_payment_request',
  async (paymentId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        '/payment/confirm-request',
        { paymentId },
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); // End of confirm payment request method

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

      .addCase(vendor_payment_details.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.pendingWithdraws = payload.pendingWithdraws;
        state.successWithdraws = payload.successWithdraws;
        state.totalAmount = payload.totalAmount;
        state.withdrawAmount = payload.withdrawAmount;
        state.pendingAmount = payload.pendingAmount;
        state.availableAmount = payload.availableAmount;
      })
      .addCase(vendor_payment_details.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(send_withdrawal_request.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(send_withdrawal_request.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.pendingWithdraws = [
          ...state.pendingWithdraws,
          payload.withdrawal,
        ];
        state.availableAmount =
          state.availableAmount - payload.withdrawal.amount;
        state.pendingAmount = payload.withdrawal.amount;
      })
      .addCase(send_withdrawal_request.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(get_payment_request.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.pendingWithdraws = payload.withdrawalRequest;
      })
      .addCase(confirm_payment_request.pending, (state) => {
        state.loader = true;
      })
      .addCase(confirm_payment_request.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(confirm_payment_request.rejected, (state, { payload }) => {
        const temp = state.pendingWithdraws.filter(
          (r) => r._id !== payload.payment._id
        );
        state.loader = false;
        state.errorMessage = payload.message;
        state.pendingWithdraws = temp;
      });
  },
});

export const { clearMessages } = paymentReducer.actions;
export default paymentReducer.reducer;

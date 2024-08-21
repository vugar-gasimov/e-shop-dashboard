import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      const { data } = await api.post('/add-category', formData, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const initialState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  categories: [],
};

export const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearMessages: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addCategory.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'Login failed.';
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message || 'Login successful!';
      });
  },
});

export const { clearMessages } = categoryReducer.actions;
export default categoryReducer.reducer;

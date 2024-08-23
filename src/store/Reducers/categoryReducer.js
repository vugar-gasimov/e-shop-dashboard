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
      return rejectWithValue(
        error.response?.data || { error: 'An error occurred' }
      );
    }
  }
); // End of addCategory method.

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (
    { page, perPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-categories?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
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
  categories: [],
  totalCategories: 0,
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
        state.errorMessage = payload.error || 'An error occurred';
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.categories = [...state.categories, payload.categories];
      })
      .addCase(getCategories.pending, (state, { payload }) => {
        state.textLoader = true;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.textLoader = false;
        state.errorMessage = payload.error || 'An error occurred';
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.textLoader = false;
        state.totalCategories = payload.totalCategories;
        state.successMessage = payload.message;
        state.categories = payload.categories;
      });
  },
});

export const { clearMessages } = categoryReducer.actions;
export default categoryReducer.reducer;

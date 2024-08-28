import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const add_product = createAsyncThunk(
  'product/add_product',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/add-product', product, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'An error occurred' }
      );
    }
  }
); // End of add_product method.

export const get_products = createAsyncThunk(
  'product/get_products',
  async (
    { page, perPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-products?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
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
); // End of getProducts method.

export const get_product = createAsyncThunk(
  'product/get_product',
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-product/${productId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { error: 'An error occurred' }
      );
    }
  }
); // End of get product method.

export const edit_product = createAsyncThunk(
  'product/edit_product',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/edit-product', product, {
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
); // End of edit product method.

const initialState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  products: [],
  product: '',
  totalProducts: 0,
};

export const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'An error occurred';
      })
      .addCase(add_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(get_products.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_products.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'An error occurred';
      })
      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.totalProducts = payload.totalProducts;
        state.successMessage = payload.message;
        state.products = payload.products;
      })
      .addCase(get_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'An error occurred';
      })
      .addCase(get_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.product = payload.product;
      })
      .addCase(edit_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(edit_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage =
          payload.error || 'An error occurred during updating the product.';
      })
      .addCase(edit_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.product = payload.product;
      });
  },
});

export const { clearMessages } = productReducer.actions;
export default productReducer.reducer;

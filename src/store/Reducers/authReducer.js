import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import { jwtDecode } from 'jwt-decode';

export const admin_login = createAsyncThunk(
  'auth/admin_login',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/admin-login', info, {
        withCredentials: true,
      });
      localStorage.setItem('accessToken', data.token);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const vendor_login = createAsyncThunk(
  'auth/vendor_login',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/vendor-login', info, {
        withCredentials: true,
      });

      localStorage.setItem('accessToken', data.token);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  'auth/get_user_info',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/get-user-info', {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const vendor_register = createAsyncThunk(
  'auth/vendor_register',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post('/vendor-register', info, {
        withCredentials: true,
      });

      localStorage.setItem('accessToken', data.token);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
); // End of vendor register method

export const uploadImage = createAsyncThunk(
  'auth/uploadImage',
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/upload-image', image, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
); // End of upload image method

export const addProfileInfo = createAsyncThunk(
  'auth/addProfileInfo',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/add-profile-info', info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
); // End of Add Profile Info method

const returnRole = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem('accessToken');
      return null;
    } else {
      return decodeToken.role;
    }
  } else {
    return null;
  }
};

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/logout', {
        withCredentials: true,
      });

      localStorage.removeItem('accessToken');
      if (role === 'admin') {
        navigate('/admin/login');
      } else {
        navigate('/login');
      }
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
); // End of logout method

const initialState = {
  successMessage: '',
  errorMessage: '',
  loader: false,
  userInfo: null,
  role: returnRole(localStorage.getItem('accessToken')),
  token: localStorage.getItem('accessToken'),
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearMessages: (state, _) => {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'Login failed.';
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message || 'Login successful!';
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })
      .addCase(vendor_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(vendor_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'Login failed.';
      })
      .addCase(vendor_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message || 'Login successful!';
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })
      .addCase(vendor_register.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(vendor_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'Login failed.';
      })
      .addCase(vendor_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message || 'Login successful!';
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })
      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message || 'Login successful!';
        state.userInfo = payload.userInfo;
      })
      .addCase(uploadImage.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'Image upload failed.';
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage = payload.message || 'Image uploaded successful!';
      })
      .addCase(addProfileInfo.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addProfileInfo.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error || 'Shop information update failed.';
      })
      .addCase(addProfileInfo.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage =
          payload.message || 'Shop information updated successfully.';
      });
  },
});

export const { clearMessages } = authReducer.actions;
export default authReducer.reducer;

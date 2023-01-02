import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import setAuthToken from '../../utils/setAuthToken';
//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Register User
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.tosString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login User
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.tosString();
    return thunkAPI.rejectWithValue(message);
  }
});

//Logout User
export const logout = createAsyncThunk('/auth/logout', async () => {
  await authService.logout();
});

//Create CSV
export const create_csv = createAsyncThunk(
  '/auth/create_csv',
  async (csvData, thunkAPI) => {
    try {
      return await authService.create_csv(csvData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.tosString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Load User
export const loadUser = createAsyncThunk('/auth/', async () => {
  await authService.loadUser();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },

  extraReducers: (builder) => {
    builder
      //reducer for registering user
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      //reducer for login function
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem('token');
      })

      // .addCase(loadUser.fullfilled, (state) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      // })

      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        localStorage.removeItem('token');
      })

      //extra reducers for create_csv function
      .addCase(create_csv.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create_csv.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(create_csv.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import invService from './invService';

// const invData = JSON.parse(localStorage.getItem('invData'));
const initialState = {
  data: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

//Company Details for Invoice
export const create_invoice = createAsyncThunk(
  '/invoice/create_invoice',
  async (thunkAPI) => {
    try {
      return await invService.create_invoice();
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

export const invSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    clearInvoice: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    builder
      //reducer for getting invoice data/company details
      .addCase(create_invoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create_invoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(create_invoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      });
  },
});
export const { clearInvoice } = invSlice.actions;
export default invSlice.reducer;

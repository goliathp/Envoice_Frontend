import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import invService from './invService';

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

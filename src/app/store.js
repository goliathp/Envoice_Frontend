import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import invoiceReducer from '../features/invoice/invSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
  },
});

export default store;

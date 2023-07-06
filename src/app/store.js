import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../features/transactions/transactionsSlice';
const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});

export default store;

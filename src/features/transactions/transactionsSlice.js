import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from './transactionsAPI';

const initialState = {
  isLoading: false,
  transactions: [],
  isError: false,
  error: '',
  editing: {},
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const transaction = await getTransactions();
    return transaction;
  }
);

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

export const changeTransaction = createAsyncThunk(
  'transactions/changeTransactions',
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  'transactions/removeTransaction',
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

const transactionsReducer = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    editModeActive(state, action) {
      state.editing = action.payload;
    },
    editModeInactive(state) {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.transactions = [];
        state.error = action.error?.message;
      });
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
    builder
      .addCase(changeTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(changeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.transactions.findIndex(
          (item) => item.id === action.payload.id
        );
        state.transactions[index] = action.payload;
      })
      .addCase(changeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
    builder
      .addCase(removeTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = state.transactions.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default transactionsReducer.reducer;
export const { editModeActive, editModeInactive } = transactionsReducer.actions;

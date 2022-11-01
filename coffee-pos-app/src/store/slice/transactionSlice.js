import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionAPI } from "modules/Dashboard/infrastructure/api";

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async (params, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.get(params);
      console.log("response", response);
      return response;
    } catch (transactionError) {
      return rejectWithValue(transactionError.response);
    }
  }
);
export const getTransactionDetail = createAsyncThunk(
  "transaction/getTransactions",
  async (id, { rejectWithValue }) => {
    try {
      const response = await transactionAPI.show(id);
      console.log("response", response);
      return response;
    } catch (transactionError) {
      return rejectWithValue(transactionError.response);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    transactionLoading: false,
    transactionError: "",
  },
  reducers: {
    setTransactionLoading: (state, action) => {
      state.transactionLoading = action.payload;
    },
  },
  extraReducers: {
    [getTransactions.pending]: (state, action) => {
      state.transactionLoading = true;
    },
    [getTransactions.fulfilled]: (state, action) => {
      state.transactionLoading = false;
      state.transactions = action.payload.data;
    },
  },
});
export const { setTransactionLoading } = transactionSlice.actions;
export default transactionSlice.reducer;

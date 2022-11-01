import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productAPI } from "modules/Dashboard/infrastructure/api";

export const createProduct = createAsyncThunk(
  "media/createProduct",
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      const response = await productAPI.store(formData);
      toast.success("Success adding product");
      return response;
    } catch (productError) {
      return rejectWithValue(productError.response);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "media/deleteProduct",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await productAPI.destroy(id);
      toast.success(response.message);
      return response;
    } catch (productError) {
      return rejectWithValue(productError.response);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "media/updateProduct",
  async ({ id, toast, formData }, { rejectWithValue }) => {
    try {
      const response = await productAPI.update(id, formData);
      toast.success(response.message);
      return response;
    } catch (productError) {
      return rejectWithValue(productError.response);
    }
  }
);
export const getProducts = createAsyncThunk(
  "media/getProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await productAPI.get(params);
      return response;
    } catch (productError) {
      return rejectWithValue(productError.response);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productLoading: false,
    productError: "",
  },
  reducers: {
    setProductLoading: (state, action) => {
      state.productLoading = action.payload;
    },
  },
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.productLoading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.productLoading = false;
      state.products.push(action.payload.data);
    },
    [createProduct.rejected]: (state, action) => {
      state.productLoading = false;
      state.productError = action.payload.message;
    },
    [deleteProduct.pending]: (state, action) => {
      state.productLoading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.productLoading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.products = state.products.filter((item) => item.id !== id);
      }
    },
    [deleteProduct.rejected]: (state, action) => {
      state.productLoading = false;
      state.productError = action.payload.message;
    },
    [updateProduct.pending]: (state, action) => {
      state.productLoading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.productLoading = false;
      const {
        arg: { id },
      } = action.meta;

      if (id) {
        state.products = state.products.map((item) =>
          item.id === id ? action.payload.data : item
        );
      }
    },
    [updateProduct.rejected]: (state, action) => {
      state.productLoading = false;
      state.productError = action.payload.message;
    },
    [getProducts.pending]: (state, action) => {
      state.productLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.productLoading = false;
      state.products = action.payload.data;
    },
  },
});
export const { setProductLoading } = productSlice.actions;
export default productSlice.reducer;

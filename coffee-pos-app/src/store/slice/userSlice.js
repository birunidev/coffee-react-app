import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "modules/Dashboard/infrastructure/api";

export const createUser = createAsyncThunk(
  "media/createUser",
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      const response = await userAPI.store(formData);
      toast.success("Success adding user");
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "media/deleteUser",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await userAPI.destroy(id);
      toast.success(response.message);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const updateUser = createAsyncThunk(
  "media/updateUser",
  async ({ id, toast, formData }, { rejectWithValue }) => {
    try {
      const response = await userAPI.update(id, formData);
      toast.success(response.message);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const getUsers = createAsyncThunk(
  "media/getUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await userAPI.get();
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const userSlice = createSlice({
  name: "product",
  initialState: {
    users: [],
    loading: false,
    error: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {
    [createUser.pending]: (state, action) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload.data);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.users = state.users.filter((item) => item.id !== id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;

      if (id) {
        state.users = state.users.map((item) =>
          item.id === id ? action.payload.data : item
        );
      }
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    },
  },
});
export const { setLoading } = userSlice.actions;
export default userSlice.reducer;

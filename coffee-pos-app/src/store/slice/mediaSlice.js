import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mediaAPI } from "modules/Dashboard/infrastructure/api";

export const createMedia = createAsyncThunk(
  "media/createMedia",
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.store(formData);
      toast.success("Success upload media");
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const deleteMedia = createAsyncThunk(
  "media/deleteMedia",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.destroy(id);
      toast.success(response.message);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const getMedia = createAsyncThunk(
  "media/getMedia",
  async (params, { rejectWithValue }) => {
    try {
      const response = await mediaAPI.get();
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    medias: [],
    loading: false,
    error: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: {
    [createMedia.pending]: (state, action) => {
      state.loading = true;
    },
    [createMedia.fulfilled]: (state, action) => {
      state.loading = false;
      state.medias.push(action.payload.data);
    },
    [createMedia.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteMedia.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteMedia.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.medias = state.medias.filter((item) => item.id !== id);
      }
    },
    [deleteMedia.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getMedia.pending]: (state, action) => {
      state.loading = true;
    },
    [getMedia.fulfilled]: (state, action) => {
      state.loading = false;
      state.medias = action.payload.data;
    },
  },
});
export const { setLoading } = mediaSlice.actions;
export default mediaSlice.reducer;

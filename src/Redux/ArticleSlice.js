import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: "",
  page: 1,
};

const fetchArticles = createAsyncThunk("api/getarticle", async (page) => {
  return await axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/articles/${page}`)
    .then((response) => {
      return response.data.nodes;
    });
});

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.data = [...state.data, ...action.payload];
        state.loading = false;
        state.page += 1;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.loading = false;
      });
  },
});

export { fetchArticles };
export default articleSlice.reducer;

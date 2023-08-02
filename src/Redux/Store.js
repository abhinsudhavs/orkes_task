import { configureStore } from "@reduxjs/toolkit";
import ArticleSliceReducer from "./ArticleSlice";

const store = configureStore({
  reducer: {
    articles: ArticleSliceReducer,
  },
});

export default store;

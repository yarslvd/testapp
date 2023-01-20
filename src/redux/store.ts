import { configureStore } from '@reduxjs/toolkit';
import { articlesReducer } from './slices/article';

export default configureStore({
  reducer: {
    articles: articlesReducer
  },
});
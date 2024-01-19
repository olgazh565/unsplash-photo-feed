import {configureStore} from '@reduxjs/toolkit';
import tokenReducer, {tokenMiddleware} from './assets/store/tokenSlice';
import authReducer from './assets/store/authSlice';
import fotosReducer from './assets/store/fotosSlice';
import singleFotoReducer from './assets/store/singleFotoSlice';
import likeSlice from './assets/store/likeSlice';
import userLikesSlice from './assets/store/userLikesSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    fotos: fotosReducer,
    singleFoto: singleFotoReducer,
    like: likeSlice,
    userLikes: userLikesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware),
  devTools: import.meta.env.DEV,
});

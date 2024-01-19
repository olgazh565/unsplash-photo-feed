import {configureStore} from '@reduxjs/toolkit';
import authReducer from './assets/store/authSlice';
import fotosReducer from './assets/store/fotosSlice';
import singleFotoReducer from './assets/store/singleFotoSlice';
import likeReducer from './assets/store/likeSlice';
import userLikesReducer from './assets/store/userLikesSlice';
import tokenReducer, {tokenMiddleware} from './assets/store/tokenSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    fotos: fotosReducer,
    singleFoto: singleFotoReducer,
    like: likeReducer,
    userLikes: userLikesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware),
  devTools: import.meta.env.DEV,
});

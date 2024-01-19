import {configureStore} from '@reduxjs/toolkit';
import authReducer from './store/authSlice';
import fotosReducer from './store/fotosSlice';
import singleFotoReducer from './store/singleFotoSlice';
import likeReducer from './store/likeSlice';
import userLikesReducer from './store/userLikesSlice';
import tokenReducer, {tokenMiddleware} from './store/tokenSlice';

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

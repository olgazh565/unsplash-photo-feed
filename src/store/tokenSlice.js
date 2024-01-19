import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {urlAuthToken} from '../api/auth';

const initialState = {
  token: localStorage.getItem('token') || '',
  status: '',
  error: '',
};

export const fetchToken = createAsyncThunk(
  'token/fetchToken',
  (_, {getState}) => {
    const token = getState().token.token;

    if (token) return;

    return axios.post(urlAuthToken)
      .then(({data: {access_token: token}}) => token)
      .catch((error) => {
        throw new Error(error);
      });
  }
);

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    deleteToken: (state) => {
      state.token = '';
      state.status = '';
    }
  },
  extraReducers: (buider) => {
    buider
      .addCase(fetchToken.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.token = action.payload;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  }
});

export default tokenSlice.reducer;

export const {deleteToken} = tokenSlice.actions;

export const tokenMiddleware = store => next => (action) => {
  if (action.type.endsWith('fetchToken/fulfilled')) {
    localStorage.setItem('token', action.payload);
  }

  if (action.type.endsWith('deleteToken')) {
    localStorage.removeItem('token');
  }

  return next(action);
};

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {URL_API} from '../api/const';
import {deleteToken} from './tokenSlice';

const initialState = {
  status: '',
  auth: {},
  error: '',
};

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  (_, {dispatch, getState}) => {
    const token = getState().token.token;

    if (!token) return;

    return axios(`${URL_API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(({data}) => {
        const {username: name, profile_image: {small: img}} = data;
        return {name, img};
      })
      .catch(e => {
        if (e.response && e.response.status === 401) {
          dispatch(deleteToken());
        }
        console.error(e);
        throw new Error(e);
      });
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: (state) => {
      state.status = '';
      state.auth = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.auth = action.payload;
        state.error = '';
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  }
});

export default authSlice.reducer;

export const {authLogout} = authSlice.actions;

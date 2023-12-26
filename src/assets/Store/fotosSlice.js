import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {CLIENT_ID, URL_API} from '../api/const';
import {deleteToken} from './tokenSlice';

const initialState = {
  status: '',
  fotos: [],
  error: '',
  page: 1,
  search: '',
  total: 0,
};

export const fetchFotos = createAsyncThunk(
  'fotos/fetchFotos',
  (search, {dispatch, getState}) => {
    const {token, status: tokenStatus} = getState().token;
    const {page} = getState().fotos;

    if (tokenStatus && tokenStatus !== 'loaded') return;

    const authorization = token ? `Bearer ${token}` : `Client-ID ${CLIENT_ID}`;

    const URL = search ?
      `${URL_API}/search/photos?query=${search}&page=${page}&per_page=30&order_by=popular` :
      `${URL_API}/photos?page=${page}&per_page=30&order_by=popular`;

    return axios(
      URL, {
        headers: {
          'Accept-Version': 'v1',
          'Authorization': authorization,
        }
      })
      .then(({data, headers}) => {
        const {'x-total': total} = headers;

        if (search) {
          const {results} = data;
          return {results, search, total};
        } else {
          return {data, total};
        }
      }
      )
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          dispatch(deleteToken());
        }
        console.error(e);
        throw new Error(e);
      });
  }
);

const fotosSlice = createSlice({
  name: 'fotos',
  initialState,
  reducers: {
    resetFotosState: (state) => {
      state.fotos = [];
      state.status = '';
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFotos.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchFotos.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.search = action.payload.search && action.payload.search;
        state.fotos = action.payload.search ?
          [...state.fotos, ...action.payload.results] :
          [...state.fotos, ...action.payload.data];
        state.total = action.payload.total;
        state.page += 1;
      })
      .addCase(fetchFotos.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
        state.page = 1;
      });
  }
});

export default fotosSlice.reducer;

export const {resetFotosState} = fotosSlice.actions;

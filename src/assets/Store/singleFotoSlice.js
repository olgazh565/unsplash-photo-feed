import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {CLIENT_ID, URL_API} from '../api/const';

const initialState = {
  status: '',
  data: {},
  error: '',
};

export const fetchSingleFoto = createAsyncThunk(
  'singleFoto/fetchSingleFoto',
  (id, {getState}) => {
    const token = getState().token.token;

    if (!id) return;

    const authorization = token ? `Bearer ${token}` : `Client-ID ${CLIENT_ID}`;

    return axios(`${URL_API}/photos/${id}`, {
      headers: {
        'Accept-Version': 'v1',
        'Authorization': authorization,
      }
    })
      .then(({data}) => data)
      .catch(e => {
        console.error('e: ', e);
        throw new Error(e);
      });
  });

export const singleFotoSlice = createSlice({
  name: 'singleFoto',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleFoto.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchSingleFoto.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(fetchSingleFoto.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  }
});

export default singleFotoSlice.reducer;



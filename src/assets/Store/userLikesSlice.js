import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {URL_API, USER} from '../api/const';
import axios from 'axios';

const initialState = {
  status: '',
  error: '',
  fotos: [],
  page: 1,
  total: 0,
};

export const fetchUserLikes = createAsyncThunk(
  'userLike/fetchUserLikes',
  (_, {getState}) => {
    const token = getState().token.token;
    const page = getState().userLikes.page;

    if (!token) return;

    return axios(`${URL_API}/users/${USER}/likes?page=${page}&per_page=20&order_by=latest`, {
      headers: {
        'Accept-Version': 'v1',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(({data, headers}) => {
        const {'x-total': total} = headers;

        return {data, total};
      })
      .catch(e => {
        throw new Error(e);
      });
  }
);

const userLikesSlice = createSlice({
  name: 'userLikes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLikes.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchUserLikes.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.fotos = [...state.fotos, ...action.payload.data];
        state.error = '';
        state.page += 1;
        state.total = action.payload.total;
      })
      .addCase(fetchUserLikes.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  }
});

export default userLikesSlice.reducer;

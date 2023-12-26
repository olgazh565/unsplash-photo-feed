import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {URL_API} from '../api/const';
import {deleteToken} from './tokenSlice';

const initialState = {
  status: '',
  error: '',
  data: {},
};

export const updateLike = createAsyncThunk(
  'like/updateLike',
  ({id, isLiked}, {dispatch, getState}) => {
    const token = getState().token.token;

    if (!id || !token) return;

    const method = isLiked ? 'DELETE' : 'POST';

    const args = {
      url: `${URL_API}/photos/${id}/like`,
      method,
      headers: {
        'Accept-Version': 'v1',
        'Authorization': `Bearer ${token}`
      }
    };

    return axios(args)
      .then(({data}) => {
        const {photo} = data;
        return photo;
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          dispatch(deleteToken());
        }
        console.error(e);
        throw new Error(e);
      });
  }
);

const likeSlice = createSlice({
  name: 'like',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateLike.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(updateLike.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(updateLike.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  }
});

export default likeSlice.reducer;


import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserLikes} from '../../store/userLikesSlice';
import {List} from '../../Components/Main/List/List';

export const UserLikes = () => {
  const dispatch = useDispatch();
  const {fotos, status, error} = useSelector(state => state.userLikes);
  const {token} = useSelector(state => state.token);

  useEffect(() => {
    if (status) return;

    dispatch(fetchUserLikes());
  }, [status, token]);

  return (
    <>
      {status === 'error' && `Ошибка: ${error}`}

      {(status === 'Loaded' && fotos.length === 0) && 'Список пуст'}

      <List />
    </>

  );
};

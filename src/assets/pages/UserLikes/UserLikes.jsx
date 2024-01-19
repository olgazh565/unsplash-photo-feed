import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserLikes} from '../../store/userLikesSlice';
import {List} from '../../Components/Main/List/List';

export const UserLikes = () => {
  const dispatch = useDispatch();
  const {fotos, status, error} = useSelector(state => state.userLikes);
  const {auth,
    status: authStatus,
    error: authError
  } = useSelector(state => state.auth);

  useEffect(() => {
    if (status || !auth.name) return;

    dispatch(fetchUserLikes());
  }, [status, auth.name]);

  return (
    <>
      {(status === 'error' || authStatus === 'error') &&
        `Ошибка: ${error || authError}`
      }
      {(status === 'Loaded' && fotos.length === 0) &&
        'Список пуст'
      }
      <List />
    </>

  );
};

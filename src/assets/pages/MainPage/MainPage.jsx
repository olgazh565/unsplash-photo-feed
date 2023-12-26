import React, {useEffect} from 'react';
import {List} from '../../Components/Main/List/List';
import {fetchFotos} from '../../store/fotosSlice';
import {useDispatch, useSelector} from 'react-redux';

export const MainPage = () => {
  const dispatch = useDispatch();
  const {status} = useSelector(state => state.fotos);
  const {token} = useSelector(state => state.token);

  useEffect(() => {
    if (status) return;

    dispatch(fetchFotos());
  }, [status, token]);

  return (
    <List />
  );
};

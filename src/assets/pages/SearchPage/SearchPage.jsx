import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {fetchFotos} from '../../store/fotosSlice';
import {List} from '../../Components/Main/List/List';

export const SearchPage = () => {
  const {fotos, status} = useSelector(state => state.fotos);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');

  useEffect(() => {
    if (status) return;

    dispatch(fetchFotos(search));
  }, [searchParams, search]);

  return (
    <>
      {(!fotos.length && status === 'loaded') &&
        <h3>Ничего не найдено по вашему запросу</h3>}

      {fotos.length !== 0 && <List />}
    </>
  );
};

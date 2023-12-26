import {useState} from 'react';
import style from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch} from 'react-redux';
import {
  fetchFotos,
  resetFotosState,
} from '../../../store/fotosSlice';
import {useNavigate} from 'react-router-dom';

export const Search = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!search.trim().length) return;

    navigate(`/search?q=${search}`);
    setSearch('');
    dispatch(resetFotosState());
    dispatch(fetchFotos(search));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        className={style.search}
        value={search}
        type='search'
        placeholder='search...'
        aria-label='search'
        onChange={e => setSearch(e.target.value)}
      />
      <button
        className={style.button}
        type='submit'>
        <SearchIcon fontSize='large' />
      </button>
    </form>
  );
};



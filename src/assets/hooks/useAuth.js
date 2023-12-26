import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {authLogout, fetchAuth} from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector(state => state.token);
  const {status, auth} = useSelector(state => state.auth);
  const pathname = JSON.parse(localStorage.getItem('pathname'));
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!token || status) return;

    dispatch(fetchAuth());

    if (searchParams.get('code')) {
      searchParams.delete('code');
      setSearchParams(searchParams);
      window.history.replaceState(null, null, '/');
    }
  }, [token, searchParams.get('code')]);

  useEffect(() => {
    if (pathname) {
      navigate(pathname);
      localStorage.removeItem('pathname');
    }
  }, [pathname]);

  const delAuth = () => dispatch(authLogout());

  return [status, auth, delAuth];
};


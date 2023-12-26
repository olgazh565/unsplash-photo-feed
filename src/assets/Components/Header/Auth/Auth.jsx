import {useDispatch, useSelector} from 'react-redux';
import style from './Auth.module.scss';
import {Login, Logout} from '@mui/icons-material';
import {Loader} from '../../../UI/Loader/Loader';
import {deleteToken} from '../../../store/tokenSlice';
import {urlAuth} from '../../../api/auth';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../../hooks/useAuth';
import {AuthMenu} from './AuthMenu/AuthMenu';

export const Auth = () => {
  const {token, status: tokenStatus} = useSelector(state => state.token);
  const [authStatus, auth, delAuth] = useAuth();
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const navigate = useNavigate();

  return (
    <div className={style.authWrapper}>
      {((!token && !tokenStatus) ||
        tokenStatus === 'error' || authStatus === 'error') && (
        <a
          className={style.login}
          href={urlAuth}
          title='Login'
          aria-label='login'
          onClick={() => {
            if (pathname.includes('photo')) {
              localStorage.setItem('pathname', JSON.stringify(pathname));
            }
          }}
        >
          <Login fontSize='large' />
        </a>
      )}

      {(tokenStatus === 'loading' || authStatus === 'loading') &&
        <Loader />
      }

      {authStatus === 'loaded' && (
        <AuthMenu img={auth.img} name={auth.name}/>

      )}

      {authStatus === 'loaded' && (
        <button
          className={style.logout}
          type='button'
          title='Logout'
          aria-label='logout'
          onClick={() => {
            dispatch(deleteToken());
            delAuth();
            if (pathname.includes('likes')) {
              navigate('/');
            }
          }}>
          <Logout fontSize='medium' />
        </button>
      )}

      {(tokenStatus === 'error' || authStatus === 'error') &&
        'Ошибка'
      }
    </div>
  );
};


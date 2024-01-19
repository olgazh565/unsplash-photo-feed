import {Home} from '@mui/icons-material';
import style from './Logo.module.scss';

export const Logo = () => (
  <a
    className={style.logo}
    href='/'
    title='Главная страница'>
    <Home fontSize='large' />
  </a>
);


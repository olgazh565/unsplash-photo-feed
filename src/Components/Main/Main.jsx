import {Navigate, Route, Routes} from 'react-router-dom';
import {Layout} from '../Layout/Layout';
import style from './Main.module.scss';
import {SingleFoto} from './SingleFoto/SingleFoto';
import {SearchPage} from '../../pages/SearchPage/SearchPage';
import {MainPage} from '../../pages/MainPage/MainPage';
import {UserLikes} from '../../pages/UserLikes/UserLikes';
import {ErrorPage} from '../../pages/ErrorPage/ErrorPage';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/photo/:id' element={<SingleFoto />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/likes' element={<UserLikes />} />
        <Route path='*' element={<Navigate to='/error' />} />
        <Route path='/error' element={<ErrorPage />} />
      </Routes>
    </Layout>
  </main>
);


import {useDispatch} from 'react-redux';
import {Header} from './assets/Components/Header/Header';
import {getAuthCode} from './assets/api/auth';
import {useEffect} from 'react';
import {fetchToken} from './assets/store/tokenSlice';
import {Route, Routes} from 'react-router-dom';
import {Main} from './assets/Components/Main/Main';

const App = () => {
  const dispatch = useDispatch();
  const code = getAuthCode();

  useEffect(() => {
    if (!code) return;

    dispatch(fetchToken());
  }, [code]);

  return (
    <Routes>
      <Route path='/*' element={
        <>
          <Header />
          <Main />
        </>
      }
      />
    </Routes>
  );
};

export default App;

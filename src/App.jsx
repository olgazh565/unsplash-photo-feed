import {useDispatch} from 'react-redux';
import {Header} from './Components/Header/Header';
import {getAuthCode} from './api/auth';
import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Main} from './Components/Main/Main';
import {fetchToken} from './store/tokenSlice';

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

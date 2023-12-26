import {useEffect} from 'react';
import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const timerIdRef = useRef(null);

  useEffect(() => {
    timerIdRef.current = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(timerIdRef.current);
    };
  }, []);

  return (
    <h3>
      Такой страницы не существует.
      Через 5 секунд будете переправлены на главную страницу
    </h3>
  );
};

import style from './List.module.scss';
import Masonry from 'react-masonry-css';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {FotoItem} from './FotoItem/FotoItem';
import {Loader} from '../../../UI/Loader/Loader';
import {fetchFotos} from '../../../store/fotosSlice';
import {fetchUserLikes} from '../../../store/userLikesSlice';

export const List = () => {
  const dispatch = useDispatch();
  const endList = useRef(null);
  const {pathname} = useLocation();
  const isLikesPage = pathname.includes('likes');
  const fotos =
    isLikesPage ? useSelector(state => state.userLikes.fotos) :
      useSelector(state => state.fotos.fotos);
  const status =
    isLikesPage ? useSelector(state => state.userLikes.status) :
      useSelector(state => state.fotos.status);
  const error =
    isLikesPage ? useSelector(state => state.userLikes.error) :
      useSelector(state => state.fotos.error);
  const total =
    isLikesPage ? useSelector(state => state.userLikes.total) :
      useSelector(state => state.fotos.total);
  const search = useSelector(state => state.fotos.search);

  useEffect(() => {
    if (!endList.current) return;
    if (fotos.length >= total) return;
    if (status !== 'loaded') return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        switch (true) {
          case search:
            dispatch(fetchFotos(search));
            break;
          case isLikesPage:
            dispatch(fetchUserLikes());
            break;
          default:
            dispatch(fetchFotos());
            break;
        }
      }
    }, {
      rootMargin: '50px',
    });

    observer.observe(endList.current);

    return () => {
      endList.current && observer.unobserve(endList.current);
    };
  }, [endList.current, status, total]);

  const breakpointColumnsObj = {
    default: 4,
    800: 3,
    500: 2,
  };

  return (
    <>
      {status === 'error' && `Ошибка: ${error}`}

      {(search && status === 'loaded' && fotos.length !== 0) &&
        <p className={style.resultText}>
          {`По вашему запросу "${search}" найдено:`}
        </p>
      }

      <div className={style.listContainer}>
        {fotos.length !== 0 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={style.myMasonryGrid}
            columnClassName={style.myMasonryGridColumn}>
            {
              fotos.map(foto => (
                <FotoItem key={foto.id} data={foto} />
              ))
            }
          </Masonry>
        )}

        {status === 'loading' && (
          <div className={style.loader}>
            <Loader />
          </div>
        )}
      </div>

      {status === 'loaded' && (
        <div className={style.wrapper}>
          {
            (fotos.length >= 60) ?
              <button
                className={style.btn}
                type='button'
                onClick={() => {
                  switch (true) {
                    case search:
                      dispatch(fetchFotos(search));
                      break;
                    case isLikesPage:
                      dispatch(fetchUserLikes());
                      break;
                    default:
                      dispatch(fetchFotos());
                      break;
                  }
                }}
              >
                Загрузить еще
              </button> :
              <p ref={endList} className={style.end} />
          }
        </div>
      )}
    </>
  );
};


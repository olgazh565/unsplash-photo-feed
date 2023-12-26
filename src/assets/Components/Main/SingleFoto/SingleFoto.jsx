import {Link, useParams} from 'react-router-dom';
import style from './SingleFoto.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {fetchSingleFoto} from '../../../store/singleFotoSlice';
import {Loader} from '../../../UI/Loader/Loader';
import {ZoomedInImage} from './ZoomedInImage/ZoomedInImage';
import {formatDate} from '../../../utils/formatData';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {LikeBtn} from '../../../UI/LikeBtn/LikeBtn';

export const SingleFoto = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {status, data: foto, error} = useSelector(state => state.singleFoto);
  const [isImgZoomed, setIsImgZoomed] = useState(false);
  const {token} = useSelector(state => state.token);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchSingleFoto(id));
  }, [id, token]);

  const handleImgClick = () => {
    setIsImgZoomed(!isImgZoomed);
  };

  return (
    <>
      {status === 'error' && `Ошибка: ${error}`}

      {status === 'loaded' && (
        <div className={style.fotoContainer}>
          <Link to={-1} className={style.linkBack}>
            <ArrowRightAltIcon className={style.arrowIcon} />
            <span className={style.backText}>
              Назад
            </span>
          </Link>

          <img
            className={style.image}
            src={foto.urls.regular}
            alt={foto.description}
            onClick={handleImgClick}
          />

          <div className={style.fotoFooter}>
            <p className={style.description}>
              {foto.description}
            </p>
            <p className={style.description}>
              <i>{foto.location.name}</i>
            </p>

            <div className={style.info}>
              <a
                className={style.userInfo}
                href={foto.user.links.html}
                target='_blank'
                rel='noreferrer'
              >
                <img
                  className={style.avatar}
                  src={foto.user.profile_image.small}
                  alt={foto.user.username}
                />
                <span
                  className={style.userName}
                >
                  {foto.user.username}
                </span>
              </a>

              <div className={style.fotoInfo}>
                <LikeBtn
                  className={style.likeBtnFoto}
                  id={id}
                  isLiked={foto.liked_by_user}
                  likes={foto.likes}
                  color='black'
                />

                <p className={style.date}>
                  {formatDate(foto.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === 'loading' && (
        <div className={style.loader}>
          <Loader />
        </div>
      )}

      {isImgZoomed &&
        <ZoomedInImage
          src={foto.urls.full}
          alt={foto.description}
          onImgClose={handleImgClick}
        />
      }
    </>
  );
};

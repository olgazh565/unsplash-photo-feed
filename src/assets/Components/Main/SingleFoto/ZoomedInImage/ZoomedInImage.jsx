import style from './ZoomedInImage.module.scss';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {Loader} from '../../../../UI/Loader/Loader';

export const ZoomedInImage = ({src, alt, onImgClose}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return createPortal(
    <div className={style.imageContainer}>
      <img
        className={style.image}
        src={src}
        alt={alt}
        onClick={onImgClose}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />

      {!isLoaded && (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      )}

      {isError && 'Ошибка загрузки'}
    </div>,
    document.getElementById('image-root')
  );
};

ZoomedInImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onImgClose: PropTypes.func,
};

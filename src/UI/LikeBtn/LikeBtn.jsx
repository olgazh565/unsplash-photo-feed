import style from './LikeBtn.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {uselike} from '../../hooks/uselike';
import {updateLike} from '../../store/likeSlice';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from
  '@mui/icons-material/FavoriteBorderOutlined';
import PropTypes from 'prop-types';

export const LikeBtn = ({
  className,
  id,
  isLiked: isLikedResp,
  likes,
  color
}) => {
  const [likesData, isLiked, setIsLiked] = uselike(isLikedResp);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();

  return (
    <button
      className={className}
      type='button'
      onClick={() => {
        if (!token) {
          alert('Для данного действия необходима авторизация');
        } else {
          setIsLiked(!isLiked);
          dispatch(updateLike({id, isLiked}));
        }
      }}
    >
      {isLiked ?
        <FavoriteOutlinedIcon color='error' /> :
        <FavoriteBorderOutlinedIcon color='error' />
      }
      <span className={style.likesNumber} style={{color}}>
        {likesData?.id === id ? likesData?.likes : likes}
      </span>
    </button>
  );
};

LikeBtn.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  isLiked: PropTypes.bool,
  isLikedResp: PropTypes.bool,
  likes: PropTypes.number,
  color: PropTypes.string,
};

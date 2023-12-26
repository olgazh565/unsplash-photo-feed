import style from './FotoItem.module.scss';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {formatDate} from '../../../../utils/formatData';
import {LikeBtn} from '../../../../UI/LikeBtn/LikeBtn';

export const FotoItem = ({data}) => {
  const {
    id,
    description,
    likes: likesFotosList,
    created_at: createdAt,
    user: {username},
    user: {profile_image: {small: userAvatar}},
    user: {links: {html: userLink}},
    urls: {small: img},
    alt_description: altDescription,
    liked_by_user: isLikedFotosList,
  } = data;

  return (
    <div
      className={style.fotoItem}
      id={id}
      title={description}
    >
      <Link className={style.link}
        to={`/photo/${id}`}>
        <img
          className={style.image}
          src={img}
          alt={altDescription}
        />
      </Link>

      <div className={style.likesWrapper}>
        <LikeBtn
          className={style.likeBtnItem}
          id={id}
          isLiked={isLikedFotosList}
          likes={likesFotosList}
          color='white'
        />
      </div>

      <a
        className={style.userLink}
        href={userLink}
        target='_blank'
        rel='noreferrer'
      >
        <img
          className={style.userAvatar}
          src={userAvatar}
          alt={username}
          title={username}
          color='white'
        />
      </a>

      <p className={style.date}>
        {formatDate(createdAt)}
      </p>
    </div>
  );
};

FotoItem.propTypes = {
  data: PropTypes.object,
};

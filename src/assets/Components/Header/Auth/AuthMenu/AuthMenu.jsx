import style from './AuthMenu.module.scss';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {USER} from '../../../../api/const';
import {resetFotosState} from '../../../../store/fotosSlice';
import {useDispatch} from 'react-redux';

export const AuthMenu = ({img, name}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        className={style.auth}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img className={style.authImg} src={img} alt='avatar' />
        <span className={style.name}>{name}</span>

      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <a
            href={`https://unsplash.com/@${USER}`}
            target='_blank'
            rel='noreferrer'
          >
            Мой профиль
          </a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to='/likes'
            onClick={() => dispatch(resetFotosState())}>
            Мои лайки
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

AuthMenu.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
};

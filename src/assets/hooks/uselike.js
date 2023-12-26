import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export const uselike = (isLikedByUser) => {
  const {data: likesData} = useSelector(state => state.like);
  const [isLiked, setIsLiked] = useState(isLikedByUser || false);
  const token = useSelector(state => state.token.token);

  useEffect(() => {
    if (!token) {
      setIsLiked(false);
    } else {
      setIsLiked(isLiked => isLikedByUser);
    }
  }, [isLikedByUser, token]);

  return [likesData, isLiked, setIsLiked];
};

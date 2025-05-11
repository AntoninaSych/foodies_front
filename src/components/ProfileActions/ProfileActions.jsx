import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../Button/Button';
import { showModal } from '../../redux/common/slice';
import { MODALS } from '../../const';
import { selectFollowing } from '../../redux/users/selectors';
import { selectUser } from '../../redux/auth/selectors';
import { unfollow, follow } from '../../redux/users/operations';
import css from './ProfileActions.module.css';

const ProfileActions = () => {
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const authUser = useSelector(selectUser);
  const isOwnProfile = authUser.id === userId;
  const following = useSelector(selectFollowing);

  const isFollowing = () => {
    if (Array.isArray(following)) {
      return following.some(item => item.id === userId);
    }
    return false;
  };

  const handleLogout = () => {
    dispatch(showModal(MODALS.LOGOUT));
  };

  const handleFollow = () => {
    dispatch(follow(userId));
  };
  const handleUnfollow = () => {
    dispatch(unfollow(userId));
  };

  return (
    <div className={css.wrapper}>
      {isOwnProfile ? (
        <>
          <Button variant={'primary'} onClick={handleLogout}>
            Log Out
          </Button>
        </>
      ) : isFollowing() ? (
        <Button variant={'primary'} onClick={handleUnfollow}>
          Following
        </Button>
      ) : (
        <Button variant={'primary'} onClick={handleFollow}>
          Follow
        </Button>
      )}
    </div>
  );
};

export default ProfileActions;

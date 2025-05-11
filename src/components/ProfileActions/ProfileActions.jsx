import { useDispatch } from 'react-redux';
import Button from '../Button/Button.jsx';
import { showModal } from '../../redux/common/slice';
import { MODALS } from '../../const/index';

const ProfileActions = ({ isOwnProfile, isFollowing }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(showModal(MODALS.LOGOUT));
  };

  const handleFollow = () => {};
  const handleUnfollow = () => {};

  return (
    <>
      {isOwnProfile ? (
        <>
          <Button variant={'primary'} onClick={handleLogout}>
            Log Out
          </Button>
        </>
      ) : isFollowing ? (
        <Button variant={'primary'} onClick={handleUnfollow}>
          Following
        </Button>
      ) : (
        <Button variant={'primary'} onClick={handleFollow}>
          Follow
        </Button>
      )}
    </>
  );
};

export default ProfileActions;

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Container from '../../components/Container/Container';
import DetailUser from '../../components/DetailUser/DetailUser';
import ProfileActions from '../../components/ProfileActions/ProfileActions.jsx';
import {
  selectFollowing,
  selectFollowsLoading,
} from '../../redux/follows/selectors.js';
import {
  fetchFollowing,
  followUser,
  unfollowUser,
} from '../../redux/follows/operations.js';
import { showModal } from '../../redux/common/slice.js';
import { MODALS } from '../../const/index.js';
import { selectUser } from '../../redux/auth/selectors.js';
import css from './DetailUserPage.module.css';

const DetailUserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const authUser = useSelector(selectUser);
  const following = useSelector(selectFollowing);
  const loading = useSelector(selectFollowsLoading);

  useEffect(() => {
    if (authUser) dispatch(fetchFollowing());
  }, [authUser, dispatch]);

  const isOwnProfile = authUser?.id === id;
  const isFollowing = !isOwnProfile && following.some(u => u.id === id);

  const handleLogout = () => {
    dispatch(showModal({ modal: MODALS.LOGOUT }));
  };
  const handleFollow = () => {
    dispatch(followUser(id));
  };
  const handleUnfollow = () => {
    dispatch(unfollowUser(id));
  };

  return (
    <Container>
      <div className={css.wrapper}>
        Detail User Page, ID {id}
        <DetailUser data={{}} />
        <ProfileActions
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          loading={loading}
          onLogoutClick={handleLogout}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
        />
      </div>
    </Container>
  );
};

export default DetailUserPage;

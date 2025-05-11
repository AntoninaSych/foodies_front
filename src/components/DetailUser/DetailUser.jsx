import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';
import { selectToken, selectUser } from '../../redux/auth/selectors';
import { currentUserDetailFetch, userDetailFetch } from '../../api/usersApi';
import { errorHandler } from '../../utils/notification';
import Loader from '../../components/Loader/Loader';
import ProfileActions from '../ProfileActions/ProfileActions';
import css from './DetailUser.module.css';

const DetailUser = () => {
  const { id: userId } = useParams();
  const authUser = useSelector(selectUser);
  const isOwnProfile = authUser.id === userId;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectToken);

  useEffect(() => {
    const fetData = async () => {
      try {
        if (isOwnProfile) {
          setLoading(true);
          const userData = await currentUserDetailFetch(token);
          setUser(userData);
        } else if (userId) {
          setLoading(true);
          const userData = await userDetailFetch(token, userId);
          setUser(userData);
        }
      } catch (error) {
        errorHandler(error, 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetData();
  }, [userId, isOwnProfile, token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={css.wrapper}>
      {user && <UserInfo userData={user}></UserInfo>}
      <ProfileActions />
    </div>
  );
};

export default DetailUser;

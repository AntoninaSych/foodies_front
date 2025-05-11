import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserInfo from '../UserInfo/UserInfo';
import { selectToken, selectUser } from '../../redux/auth/selectors';
import { currentUserDetailFetch, userDetailFetch } from '../../api/usersApi';
import { errorHandler } from '../../utils/notification';
import Loader from '../../components/Loader/Loader';
import ProfileActions from '../ProfileActions/ProfileActions';
import css from './DetailUser.module.css';

const DetailUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const authUser = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isOwnProfile = authUser.id === id;

  useEffect(() => {
    const fetData = async () => {
      try {
        if (isOwnProfile) {
          setLoading(true);
          const userData = await currentUserDetailFetch(token);
          setUser(userData);
        } else if (id) {
          setLoading(true);
          const userData = await userDetailFetch(token, id);
          setUser(userData);
        }
      } catch (error) {
        errorHandler(error, 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetData();
  }, [id, isOwnProfile, token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={css.wrapper}>
      {user && <UserInfo userData={user}></UserInfo>}
      <ProfileActions isOwnProfile={isOwnProfile} />
    </div>
  );
};

export default DetailUser;

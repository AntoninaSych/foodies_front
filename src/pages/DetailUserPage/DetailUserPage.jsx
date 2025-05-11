import { useParams /*useLocation, useNavigate*/ } from 'react-router-dom';
import Container from '../../components/Container/Container';
import css from './DetailUserPage.module.css';
import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import UserInfo from '../../components/UserInfo/UserInfo';
import { useSelector } from 'react-redux';
import { selectToken } from '../../redux/auth/selectors';
import { useEffect, useState } from 'react';
import { currentUserDetailFetch, userDetailFetch } from '../../api/usersApi';
import { errorHandler } from '../../utils/notification';
import Loader from '../../components/Loader/Loader';

const DetailUserPage = ({ current = false }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectToken);

  useEffect(() => {
    (async () => {
      try {
        if (current) {
          setLoading(true);
          const userData = await currentUserDetailFetch(token);
          // console.log(userData);
          setUser(userData);
        } else if (id) {
          setLoading(true);
          const userData = await userDetailFetch(token, id);
          // console.log(userData);
          setUser(userData);
        }
      } catch (error) {
        errorHandler(error, 'Failed to load user');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, current, token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className={css.wrapper}>
        <PathInfo breadcrumbs={[{ name: 'profile' }]}></PathInfo>
        <MainTitle>Profile</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
        {user && <UserInfo userData={user}></UserInfo>}
      </div>
    </Container>
  );
};

export default DetailUserPage;

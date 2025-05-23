import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Container from '../../components/Container/Container';
import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import DetailUser from '../../components/DetailUser/DetailUser';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import { fetchFollowing } from '../../redux/users/operations';
import css from './DetailUserPage.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

const DetailUserPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFollowing());
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Container>
      <PathInfo breadcrumbs={[{ name: 'profile' }]}></PathInfo>
      <MainTitle>Profile</MainTitle>
      <Subtitle>
        Reveal your culinary art, share your favorite recipe and create
        gastronomic masterpieces with us.
      </Subtitle>
      <div className={css.wrapper}>
        <div className={css.sidebar}>
          <DetailUser />
        </div>
        <div className={css.content}>
          <ProfileContent />
        </div>
      </div>
    </Container>
  );
};

export default DetailUserPage;

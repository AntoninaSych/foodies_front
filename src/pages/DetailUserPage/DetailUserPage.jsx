// import { useEffect } from 'react';
import { useParams /*useLocation, useNavigate*/ } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectToken, selectUser } from '../../redux/auth/selectors';
import Container from '../../components/Container/Container';
import css from './DetailUserPage.module.css';
import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import Button from '../../components/Button/Button';
import { ROUTERS } from '../../const';
import UserInfo from '../../components/UserInfo/UserInfo';

const DetailUserPage = ({ current = false }) => {
  const { id } = useParams();
  // const token = useSelector(selectToken);
  // const user = useSelector(selectUser);
  // const location = useLocation();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  return (
    <Container>
      <div className={css.wrapper}>
        <PathInfo breadcrumbs={[{ name: 'profile' }]}></PathInfo>
        <MainTitle>Profile</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
        Detail User Page, ID {!current ? id : null}
        <UserInfo id={id}></UserInfo>
        <Button
          type="submit"
          variant={Button.variants.PRIMARY}
          to={ROUTERS.HOME}
        >
          Log out
        </Button>
      </div>
    </Container>
  );
};

export default DetailUserPage;

import Container from '../../components/Container/Container';
import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import DetailUser from '../../components/DetailUser/DetailUser';
import css from './DetailUserPage.module.css';
import ProfileContent from '../../components/ProfileContent/ProfileContent.jsx';

const DetailUserPage = () => {
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
        <div>
          <ProfileContent />
        </div>
      </div>
    </Container>
  );
};

export default DetailUserPage;

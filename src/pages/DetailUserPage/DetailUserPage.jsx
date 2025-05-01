import { useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import DetailUser from '../../components/DetailUser/DetailUser';
import css from './DetailUserPage.module.css';

const DetailUserPage = () => {
  const { id } = useParams();

  return (
    <Container>
      <div className={css.wrapper}>
        Detail User Page, ID {id}
        <DetailUser data={{}} />
      </div>
    </Container>
  );
};

export default DetailUserPage;

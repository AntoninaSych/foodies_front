import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import { ROUTERS } from '../../const';
import { fetchCategories } from '../../redux/categories/operations';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import css from './HomePage.module.css';
import AppBar from '../../components/AppBar/AppBar';
import Testimonials from '../../components/Testimonials/Testimonials.jsx';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <Container>
          <AppBar theme="dark" />
          <div className={css.hero}>
            <h1 className={css.title}>Improve Your Culinary Talents</h1>
            <h2 className={css.description}>
              Amazing recipes for beginners in the world of cooking, enveloping
              you in the aromas and tastes of various cuisines.
            </h2>
            <Button
              to={ROUTERS.ADD_RECIPE}
              variant={Button.variants.SECONDARY_REVERSED}
            >
              Add recipe
            </Button>
          </div>
        </Container>
      </div>
      <Container>
        <CategoriesList />
      </Container>
      <Container>
        <Testimonials></Testimonials>
      </Container>
    </div>
  );
};

export default HomePage;

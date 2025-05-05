import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Container from '../../components/Container/Container';
import { fetchCategories } from '../../redux/categories/operations';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import css from './HomePage.module.css';
import AppBar from '../../components/AppBar/AppBar';
import Hero from '../../components/Hero/Hero';
import { THEMES } from '../../const';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <Container>
          <AppBar theme={THEMES.DARK} />
          <Hero />
        </Container>
      </div>
      <Container>
        <CategoriesList />
      </Container>
    </div>
  );
};

export default HomePage;

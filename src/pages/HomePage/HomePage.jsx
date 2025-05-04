import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import { fetchCategories } from '../../redux/categories/operations';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import css from './HomePage.module.css';
import AppBar from '../../components/AppBar/AppBar';
import Hero from '../../components/Hero/Hero';
import Recipes from '../../components/Recipes/Recipes';

const HomePage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('desserts');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onChangeCategory = category => {
    setCategory(category);
  };

  const handleBack = () => {
    setCategory('');
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <Container>
          <AppBar theme="dark" />
          <Hero />
        </Container>
      </div>
      <Container>
        {!category ? (
          <CategoriesList onChangeCategory={onChangeCategory} />
        ) : (
          <Recipes category={category} onBack={handleBack} />
        )}
      </Container>
    </div>
  );
};

export default HomePage;

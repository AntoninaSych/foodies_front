import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import { fetchCategories } from '../../redux/categories/operations';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import AppBar from '../../components/AppBar/AppBar';
import Hero from '../../components/Hero/Hero';
import Recipes from '../../components/Recipes/Recipes';
import { THEMES } from '../../const';
import css from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onChangeCategory = category => {
    setCategory(category);
  };

  const handleBack = () => {
    setCategory(null);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <Container>
          <AppBar theme={THEMES.DARK} />
          <Hero />
        </Container>
      </div>
      <div className={css.main}>
        <Container>
          {!category ? (
            <CategoriesList onChangeCategory={onChangeCategory} />
          ) : (
            <Recipes category={category} onBack={handleBack} />
          )}
        </Container>
      </div>
    </div>
  );
};

export default HomePage;

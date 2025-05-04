import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';

import { fetchCategories } from '../../redux/categories/operations';
import { fetchIngredients } from '../../redux/ingredients/operations';
import { fetchAreas } from '../../redux/areas/operations';

import { selectIngredients } from '../../redux/ingredients/selectors';
import { selectAreas } from '../../redux/areas/selectors';

import CategoriesList from '../../components/CategoriesList/CategoriesList';
import AppBar from '../../components/AppBar/AppBar';
import Hero from '../../components/Hero/Hero';
import Recipes from '../../components/Recipes/Recipes';
import { THEMES } from '../../const/index.js';
import css from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('desserts');

  const ingredients = useSelector(selectIngredients);
  const areas = useSelector(selectAreas);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
    dispatch(fetchAreas());
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
          <AppBar theme={THEMES.DARK} />
          <Hero />
        </Container>
      </div>
      <Container>
        {!category ? (
          <CategoriesList onChangeCategory={onChangeCategory} />
        ) : (
          <Recipes
            category={category}
            onBack={handleBack}
            ingredients={ingredients}
            areas={areas}
          />
        )}
      </Container>
    </div>
  );
};

export default HomePage;

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import { ROUTERS } from '../../const';
import { fetchCategories } from '../../redux/categories/operations';
import { fetchIngredients } from '../../redux/ingredients/operations';
import { fetchAreas } from '../../redux/areas/operations';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import css from './HomePage.module.css';
import AppBar from '../../components/AppBar/AppBar';
import Recipes from '../../components/Recipes/Recipes';

import { selectIngredients } from '../../redux/ingredients/selectors';
import { selectAreas } from '../../redux/areas/selectors';

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

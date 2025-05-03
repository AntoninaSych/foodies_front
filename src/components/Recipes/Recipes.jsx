import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import RecipeList from '../RecipeList/RecipeList';

import styles from './Recipes.module.css';

import { fetchRecipes } from '../../redux/recipes/operations';
import { selectRecipes } from '../../redux/recipes/selectors';

const Recipes = ({ category, onBack, ingredients = [], areas = [] }) => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(getLimit());
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  function getLimit() {
    const width = window.innerWidth;
    return width < 768 ? 8 : 12;
  }

  useEffect(() => {
    const filters = {
      category,
      page: currentPage,
      size: limit,
      ...(selectedIngredient && { ingredient: selectedIngredient }),
      ...(selectedArea && { area: selectedArea }),
    };

    dispatch(fetchRecipes(filters));
  }, [
    dispatch,
    category,
    selectedIngredient,
    selectedArea,
    currentPage,
    limit,
  ]);

  const handleFilterChange = (type, value) => {
    if (type === 'ingredient') {
      setSelectedIngredient(value);
    } else if (type === 'area') {
      setSelectedArea(value);
    }
    setCurrentPage(1);
  };

  const recipeArray = Array.isArray(recipes) ? recipes : recipes?.recipes || [];

  console.log('recipes:', recipes);

  return (
    <section className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>
        ← <span>Back</span>
      </button>

      <div className={styles.textWrapper}>
        <MainTitle>{category}</MainTitle>
        <Subtitle>
          Go on a taste journey, where every sip is a sophisticated creative
          chord, and every dessert is an expression of the most refined
          gastronomic desires.
        </Subtitle>
      </div>

      <div className={styles.filters}>
        <select
          value={selectedIngredient}
          onChange={e => handleFilterChange('ingredient', e.target.value)}
        >
          <option value="">Ingredients</option>
          {ingredients.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={selectedArea}
          onChange={e => handleFilterChange('area', e.target.value)}
        >
          <option value="">Area</option>
          {areas.map(area => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {recipeArray.length > 0 ? (
        <RecipeList recipes={recipeArray} />
      ) : (
        <p className={styles.message}>No recipes found.</p>
      )}
    </section>
  );
};

export default Recipes;

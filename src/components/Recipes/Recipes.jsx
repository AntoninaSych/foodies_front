import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowBack } from 'react-icons/io5';
import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import RecipeList from '../RecipeList/RecipeList';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import { fetchRecipes } from '../../redux/recipes/operations';
import { selectRecipes } from '../../redux/recipes/selectors';
import styles from './Recipes.module.css';

const Recipes = ({ category, onBack }) => {
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
    dispatch(
      fetchRecipes({
        category,
        ingredient: selectedIngredient,
        area: selectedArea,
        page: currentPage,
        size: limit,
      })
    );
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

  return (
    <section>
      <div className={styles.navigation}>
        <button className={styles.backBtn} onClick={onBack}>
          <IoArrowBack /> Back
        </button>
      </div>

      <MainTitle>{category}</MainTitle>
      <Subtitle>
        Go on a taste journey, where every sip is a sophisticated creative
        chord, and every dessert is an expression of the most refined
        gastronomic desires.
      </Subtitle>

      <div className={styles.content}>
        <RecipeFilters
          selectedArea={selectedArea}
          selectedIngredient={selectedIngredient}
          onFilterChange={handleFilterChange}
        />

        {recipes.length ? (
          <RecipeList recipes={recipes} />
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </section>
  );
};

export default Recipes;

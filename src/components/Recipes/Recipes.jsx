import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { IoArrowBack } from 'react-icons/io5';
import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import RecipeList from '../RecipeList/RecipeList';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import { recipesFetch } from '../../api/recipesApi';
import { errorHandler } from '../../utils/notification';
import { CATALOG_LIMIT } from '../../const';
import { selectRecipes } from '../../redux/recipes/selectors';
import css from './Recipes.module.css';

const Recipes = ({ category, onBack }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const data = useSelector(selectRecipes);
  const [recipes, setRecipes] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ ingredient: '', area: '' });
  const limit = isMobile ? 8 : CATALOG_LIMIT;
  const { ingredient, area } = filters;

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
      try {
        const response = await recipesFetch({
          category,
          ingredient,
          area,
          page: currentPage,
          limit: limit,
        });

        setRecipes(response.items || []);
  } catch (error) {
    errorHandler(error, 'Error while fetching recipes.');
  }
};

    // TODO fetch new data only if there is at least one filter is set.
    // Comment the condition to fetch recipes if passing recipes as a prop not implemented yet
    useEffect(() => {
      if (category) {
        fetchData();
      }
    }, [category, ingredient, area, currentPage, limit, fetchData]);

  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
    setCurrentPage(1);
  };

  return (
    <section>
      <div className={css.navigation}>
        <button className={css.backBtn} onClick={onBack}>
          <IoArrowBack /> Back
        </button>
      </div>

      <MainTitle>{category}</MainTitle>
      <Subtitle>
        Go on a taste journey, where every sip is a sophisticated creative
        chord, and every dessert is an expression of the most refined
        gastronomic desires.
      </Subtitle>

      <div className={css.content}>
        <RecipeFilters filters={filters} onFilterChange={handleFilterChange} />

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

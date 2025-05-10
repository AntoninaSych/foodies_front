import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import MainTitle from '../MainTitle/MainTitle';
import Subtitle from '../Subtitle/Subtitle';
import RecipeList from '../RecipeList/RecipeList';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import { recipesFetch } from '../../api/recipesApi';
import { errorHandler } from '../../utils/notification';
import { CATALOG_LIMIT } from '../../const';
import Message from '../Message/Message';
import css from './Recipes.module.css';
import Pagination from '../Pagination/Pagination';

const Recipes = ({ category }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchArea = searchParams.get('area') || '';
  const searchIngredient = searchParams.get('ingredient') || '';
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const limit = isMobile ? 8 : CATALOG_LIMIT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await recipesFetch({
          category,
          ingredient: searchIngredient,
          area: searchArea,
          page,
          limit,
        });

        const { items = [], totalPages = 0 } = response;
        setRecipes(items);
        setTotalPages(totalPages);
      } catch (error) {
        errorHandler(error, 'Error while fetching recipes.');
      }
    };

    if (category) {
      fetchData();
    }
  }, [category, searchIngredient, searchArea, page, limit]);

  const handleFilterChange = (name, value) => {
    const params = {
      category,
      area: searchArea,
      ingredient: searchIngredient,
    };
    params[name] = value;
    setSearchParams(params);
  };

  const handleBackClick = () => {
    setSearchParams({});
  };

  const handlePageChange = page => {
    setPage(page);
  };

  return (
    <section>
      <div className={css.navigation}>
        <button className={css.backBtn} onClick={handleBackClick}>
          <IoArrowBack /> Back
        </button>
      </div>

      <MainTitle>{category}</MainTitle>
      <Subtitle className={css.subtitle}>
        Go on a taste journey, where every sip is a sophisticated creative
        chord, and every dessert is an expression of the most refined
        gastronomic desires.
      </Subtitle>

      <div className={css.content}>
        <RecipeFilters
          areaValue={searchArea}
          ingredientValue={searchIngredient}
          onFilterChange={handleFilterChange}
        />
        <div className={css.recipesContent}>
          {recipes.length ? (
            <RecipeList recipes={recipes} />
          ) : (
            <Message>No recipes found.</Message>
          )}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageNumbersToShow={3}
          />
        </div>
      </div>
    </section>
  );
};

export default Recipes;

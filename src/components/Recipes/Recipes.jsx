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
import css from './Recipes.module.css';

const Recipes = ({ category }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchArea = searchParams.get('area') || '';
  const searchIngredient = searchParams.get('ingredient') || '';

  const [page] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [, setTotal] = useState(0);
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
        const { items, total } = response;
        setRecipes(items);
        setTotal(total);
      } catch (error) {
        errorHandler(error, 'Error while fetching recipes.');
        console.log(error);
      }
    };

    fetchData();
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

  // // TODO used for Paginator
  // const handleChangePage = value => {
  //   setPage(value);
  // };

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

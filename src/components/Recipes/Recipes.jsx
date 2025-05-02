import { useEffect, useRef, useState } from 'react';

import MainTitle from '../MainTitle/MainTitle.jsx';
import Subtitle from '../Subtitle/Subtitle.jsx';
import RecipeList from '../RecipeList/RecipeList.jsx';
import RecipeFilters from '../RecipeFilters/RecipeFilters.jsx';
import categoryDescriptions from '../../constants/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectArea } from '../../redux/areas/areaSlice';
import { selectIngredient } from '../../redux/ingredients/ingredientSlice';
import { selectCategory } from '../../redux/categories/categorySlice';
import Pagination from '../Pagination/Pagination.jsx';
import { fetchRecipesByFilters } from '../../redux/recipes/operations.js';
import { useLocation, useNavigate } from 'react-router';
import { selectLoading } from '../../redux/recipes/selectors.js';
import Loader from '../Loader/Loader.jsx';

import style from '../App.module.css';
import css from './Recipes.module.css';
import icons from '../../img/icons2.svg';

const Recipes = () => {
  const categoriesListElement = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const selectedCategory = useSelector(
    state => state.categories.selectedCategory
  );
  const selectedArea = useSelector(state => state.areas.selectedArea);
  const selectedIngredient = useSelector(
    state => state.ingredients.selectedIngredient
  );
  const recipes = useSelector(state => state.recipes.list);
  const prevLocation = location.state || '/';
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(getLimit());

  function getLimit() {
    const width = window.innerWidth;
    return width < 768 ? 8 : 12;
  }

  useEffect(() => {
    const handleResize = () => {
      setLimit(getLimit());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleClick = () => {
    navigate(prevLocation);
    dispatch(selectArea(''));
    dispatch(selectIngredient(''));
    dispatch(selectCategory(''));
  };

  useEffect(() => {
    dispatch(
      fetchRecipesByFilters({
        category: selectedCategory,
        area: selectedArea,
        ingredient: selectedIngredient,
        page: currentPage,
        size: limit,
      })
    );
  }, [
    dispatch,
    selectedCategory,
    selectedArea,
    selectedIngredient,
    currentPage,
    limit,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedArea, selectedIngredient]);

  useEffect(() => {
    if (recipes.totalPages) {
      setTotalPages(recipes.totalPages);
    }
  }, [recipes]);

  return (
    <section className={css['recipes-section']}>
      <div className={style.container}>
        <button className={css.btn} onClick={handleClick}>
          <svg className={css.icon}>
            <use href={`${icons}#icon-arrow-up-right`}></use>
          </svg>
          back
        </button>
        <div ref={categoriesListElement}></div>
        <MainTitle>
          {!selectedCategory ? 'Recipes' : selectedCategory}
        </MainTitle>
        <Subtitle>{categoryDescriptions[selectedCategory]}</Subtitle>
        <div className={css['recipes-category']}>
          <div>
            <RecipeFilters />
          </div>
          <div className={css.loader}>
            {isLoading && <Loader />}
            {recipes.recipes
              ? !isLoading && <RecipeList recipes={recipes.recipes} />
              : !isLoading && (
                  <p className={css.message}>
                    No recipes found for this category.
                  </p>
                )}
            {recipes.totalItems === 0 ? (
              !isLoading && <p className={css.message}>No recipes found.</p>
            ) : (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipes;

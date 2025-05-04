import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RecipeCard } from '../RecipeCard/RecipeCard';
import { selectFavoriteRecipes } from '../../redux/recipes/selectors';
import { getFavoriteRecipes } from '../../redux/recipes/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import css from './RecipeList.module.css';

const RecipeList = ({ recipes }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getFavoriteRecipes());
    }
  }, [dispatch, isLoggedIn]);

  const isFavorite = id => {
    if (!Array.isArray(favoriteRecipes)) return false;
    return favoriteRecipes.some(fav => fav.recipeId === id); // АБО fav.id === id
  };

  return (
    <ul className={css['recipes-list']}>
      {recipes.map(recipe => (
        <li key={recipe.id} className={css['recipes-item']}>
          <RecipeCard recipe={recipe} isFavorite={isFavorite(recipe.id)} />
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;

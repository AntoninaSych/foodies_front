import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  selectRecipes,
  selectLoading,
  selectError,
  selectFavoriteRecipes,
} from '../../redux/recipes/selectors';
import { getFavoriteRecipes } from '../../redux/recipes/operations';

import css from './RecipeList.module.css';
import RecipeCard from '../RecipeCard/RecipeCard';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';

const RecipeList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  useEffect(() => {
    dispatch(getFavoriteRecipes());
  }, [dispatch]);

  const isFavorite = id => {
    if (!Array.isArray(favoriteRecipes)) return false;
    return favoriteRecipes.some(fav => fav.recipeId === id);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={css.wrapper}>
      {error && <Message>{error}</Message>}
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={isFavorite(recipe.id)}
          />
        ))
      )}
    </div>
  );
};

export default RecipeList;

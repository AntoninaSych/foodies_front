import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectFavoriteRecipes } from '../../redux/recipes/selectors';
import { getFavoriteRecipes } from '../../redux/recipes/operations';
import RecipeCard from '../RecipeCard/RecipeCard';
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
    return !Array.isArray(favoriteRecipes)
      ? false
      : favoriteRecipes.some(fav => fav.id === id);
  };

  return (
    <div className={css.wrapper}>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={isFavorite(recipe.id)}
        />
      ))}
    </div>
  );
};

export default RecipeList;

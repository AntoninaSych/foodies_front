import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectFavoriteRecipes } from '../../redux/recipes/selectors';
import { getFavoriteRecipes } from '../../redux/recipes/operations';
import RecipeCard from '../RecipeCard/RecipeCard';
import css from './RecipeList.module.css';

const RecipeList = ({ recipes }) => {
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  useEffect(() => {
    dispatch(getFavoriteRecipes());
  }, [dispatch]);

  const isFavorite = id => {
    if (!Array.isArray(favoriteRecipes)) return false;
    return favoriteRecipes.some(fav => fav.recipeId === id);
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

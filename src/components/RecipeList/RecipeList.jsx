import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectFavoriteRecipes } from '../../redux/recipes/selectors';
import {
  addToFavorites,
  getFavoriteRecipes,
  removeFromFavorites,
} from '../../redux/recipes/operations';
import RecipeCard from '../RecipeCard/RecipeCard';
import { showModal } from '../../redux/common/slice';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { MODALS, ROUTERS } from '../../const';
import css from './RecipeList.module.css';

const RecipeList = ({ recipes }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
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

  const handleAddFavorite = recipeId => {
    if (!isLoggedIn) {
      return dispatch(showModal(MODALS.AUTH));
    }
    dispatch(addToFavorites(recipeId));
  };

  const handleRemoveFavorite = recipeId => {
    if (!isLoggedIn) {
      return dispatch(showModal(MODALS.AUTH));
    }
    dispatch(removeFromFavorites(recipeId));
  };

  const handleAuthorClick = ownerId => () => {
    if (!isLoggedIn) {
      return dispatch(showModal(MODALS.AUTH));
    }

    navigate(`${ROUTERS.USER}/${ownerId}`);
  };

  return (
    <div className={css.wrapper}>
      {recipes.map(recipe => (
        <RecipeCard
          addFavorite={handleAddFavorite}
          removeFavorite={handleRemoveFavorite}
          key={recipe.id}
          recipe={recipe}
          handleAuthorClick={handleAuthorClick(recipe.owner?.id)}
          isFavorite={isFavorite(recipe.id)}
        />
      ))}
    </div>
  );
};

export default RecipeList;

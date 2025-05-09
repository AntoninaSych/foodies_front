import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectFavoriteRecipes } from '../../redux/recipes/selectors';
import {
  addToFavorites,
  getFavoriteRecipes,
  removeFromFavorites,
} from '../../redux/recipes/operations';
import RecipeCard from '../RecipeCard/RecipeCard';
import SignInModal from '../SignInModal/SignInModal';
import css from './RecipeList.module.css';
import { ROUTERS } from '../../const';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RecipeList = ({ recipes }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getFavoriteRecipes());
    }
  }, [dispatch, isLoggedIn]);

  const onUnAuthClick = () => {
    setShowAuthModal(true);
  };
  const handleOnCloseModal = () => {
    setShowAuthModal(false);
  };

  const isFavorite = id => {
    return !Array.isArray(favoriteRecipes)
      ? false
      : favoriteRecipes.some(fav => fav.id === id);
  };

  const handleAddFavorite = recipeId => {
    if (!isLoggedIn) {
      return setShowAuthModal(true);
    }
    dispatch(addToFavorites(recipeId));
  };

  const handleRemoveFavorite = recipeId => {
    if (!isLoggedIn) {
      return setShowAuthModal(true);
    }
    dispatch(removeFromFavorites(recipeId));
  };

  const handleAuthorClick = ownerId => () => {
    if (!isLoggedIn) {
      return setShowAuthModal(true);
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
          onUnAuthClick={onUnAuthClick}
          handleAuthorClick={handleAuthorClick(recipe.owner?.id)}
          isFavorite={isFavorite(recipe.id)}
        />
      ))}

      <SignInModal isOpen={showAuthModal} onClose={handleOnCloseModal} />
    </div>
  );
};

export default RecipeList;

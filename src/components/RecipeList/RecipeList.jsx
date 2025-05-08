import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectFavoriteRecipes } from '../../redux/recipes/selectors';
import { getFavoriteRecipes } from '../../redux/recipes/operations';
import RecipeCard from '../RecipeCard/RecipeCard';
import SignInModal from '../SignInModal/SignInModal';
import css from './RecipeList.module.css';

const RecipeList = ({ recipes }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  useEffect(() => {
    dispatch(getFavoriteRecipes());
  }, [dispatch]);

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

  return (
    <div className={css.wrapper}>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onUnAuthClick={onUnAuthClick}
          isFavorite={isFavorite(recipe.id)}
        />
      ))}

      <SignInModal isOpen={showAuthModal} onClose={handleOnCloseModal} />
    </div>
  );
};

export default RecipeList;

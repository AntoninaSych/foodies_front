import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  addToFavorites,
  getFavoriteRecipes,
  removeFromFavorites,
} from '../../redux/recipes/operations';
import Button from '../Button/Button';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectFavoriteRecipes } from '../../redux/recipes/selectors';
import { showModal } from '../../redux/common/slice';
import { MODALS } from '../../const';
import css from './RecipePreparation.module.css';

const RecipePreparation = ({ recipe }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavoriteRecipes);

  const isFavorite =
    Array.isArray(favorites) && favorites.some(fav => fav.id === recipe.id);

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      return dispatch(showModal(MODALS.AUTH));
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.id));
    } else {
      dispatch(addToFavorites(recipe.id));
    }
  };

  const paragraphs = recipe.instructions
    .split(/\r?\n\s*\r?\n/)
    .filter(p => p.trim() !== '');

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getFavoriteRecipes());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>RECIPE PREPARATION</h3>
      {paragraphs.map((text, idx) => (
        <p key={idx} className={css.instructions}>
          {text}
        </p>
      ))}

      <div className={css.actions}>
        <Button
          variant="secondary"
          className={css.action}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </Button>
      </div>
    </div>
  );
};

export default RecipePreparation;

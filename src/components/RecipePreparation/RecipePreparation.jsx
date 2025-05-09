import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/recipes/operations';
import Button from '../Button/Button';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { selectFavoriteRecipes } from '../../redux/recipes/selectors';
import css from './RecipePreparation.module.css';

const RecipePreparation = ({ recipe }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavoriteRecipes);
  if (!recipe) return null;

  const isFavorite =
    Array.isArray(favorites) && favorites.some(fav => fav.id === recipe.id);

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      // TODO SHOW AUTH MODAL
      // return dispatch(showModal(MODALS.AUTH));
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

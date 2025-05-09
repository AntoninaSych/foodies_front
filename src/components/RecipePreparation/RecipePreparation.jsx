import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/recipes/operations';
import Button from '../Button/Button';
import css from './RecipePreparation.module.css';

const RecipePreparation = ({ recipe }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.recipes.favorites);
  if (!recipe) return null;

  const isFavorite =
    Array.isArray(favorites) && favorites.some(fav => fav.id === recipe.id);

  //console.log('> RecipePreparation render, instructions:', recipe.instructions);

  const handleFavoriteClick = () => {
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

      <Button
        variant="secondary"
        className={css.action}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </Button>
    </div>
  );
};

export default RecipePreparation;

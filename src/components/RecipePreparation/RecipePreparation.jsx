import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/recipes/operations';
import { Button } from '@mui/material';
import css from './RecipePreparation.module.css';

const RecipePreparation = ({ recipe }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.recipes.favorites);
  const isFavorite = Array.isArray(favorites) && favorites.includes(recipe.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.id));
    } else {
      dispatch(addToFavorites(recipe.id));
    }
  };

  return (
    <div className={css.wrapper}>
      <p className={css.instructions}>{recipe.instructions}</p>
      <Button
        className={css.actionButton}
        variant="contained"
        color={isFavorite ? 'secondary' : 'primary'}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </Button>
    </div>
  );
};

export default RecipePreparation;

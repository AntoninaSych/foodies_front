import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './RecipeCard.module.css';

import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/recipes/operations';

import { useAuth } from '../../hooks/useAuth';

export const RecipeCard = ({ recipe, isFavorite }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const handleFavoriteToggle = () => {
    if (!isAuth) return alert('Please sign in to manage favorites');
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe._id));
    } else {
      dispatch(addToFavorites(recipe._id));
    }
  };

  const handleAuthorClick = () => {
    if (!isAuth) return alert('Sign in to view profile');
    if (recipe.user?.id) navigate(`/user/${recipe.user.id}`);
  };

  const handleViewRecipe = () => navigate(`/recipe/${recipe._id}`);

  return (
    <div className={styles.card}>
      <img src={recipe.preview} alt={recipe.title} className={styles.image} />

      <div className={styles.content}>
        <h4 className={styles.title}>{recipe.title}</h4>
        <p className={styles.description}>{recipe.description}</p>

        <div className={styles.footer}>
          <button className={styles.author} onClick={handleAuthorClick}>
            by {recipe.user?.name || 'Anonymous'}
          </button>

          <div className={styles.actions}>
            <button
              className={`${styles.heart} ${isFavorite ? styles.active : ''}`}
              onClick={handleFavoriteToggle}
              type="button"
            >
              ❤️
            </button>
            <button
              className={styles.arrow}
              onClick={handleViewRecipe}
              type="button"
            >
              ➡️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

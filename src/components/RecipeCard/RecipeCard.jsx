import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { GoArrowUpRight } from 'react-icons/go';
import { FaRegHeart } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa6';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/recipes/operations';

import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { ROUTERS } from '../../const';
import css from './RecipeCard.module.css';

export const RecipeCard = ({ recipe, isFavorite = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleFavoriteToggle = () => {
    if (!isLoggedIn) return alert('Please sign in to manage favorites');
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.id));
    } else {
      dispatch(addToFavorites(recipe.id));
    }
  };

  const handleAuthorClick = () => {
    // TODO show modal SignInModal if not isLoggedIn
    if (!isLoggedIn) return alert('Sign in to view profile');
    if (recipe.owner) {
      navigate(`${ROUTERS.USER}/${recipe.owner.id}`);
    }
  };

  const handleViewRecipe = () => navigate(`/recipe/${recipe.id}`);

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img src={recipe.thumb} alt={recipe.title} className={css.image} />
      </div>
      <div className={css.content}>
        <h4 className={css.title}>{recipe.title}</h4>
        <p className={css.description}>{recipe.description}</p>

        <div className={css.footer}>
          {recipe.owner && (
            <button className={css.author} onClick={handleAuthorClick}>
              <img
                className={css.avatar}
                src={recipe.owner.avatarURL || 'https://i.pravatar.cc/320'}
                width={32}
                height={32}
              />
              {recipe.owner.name}
            </button>
          )}

          <div className={css.actions}>
            <button
              className={clsx(css.actionButton, isFavorite && css.active)}
              onClick={handleFavoriteToggle}
              type="button"
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button
              className={css.actionButton}
              onClick={handleViewRecipe}
              type="button"
            >
              <GoArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

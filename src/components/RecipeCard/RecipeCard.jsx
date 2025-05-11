import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { GoArrowUpRight } from 'react-icons/go';
import { FaRegHeart } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa6';
import { MODALS, ROUTERS } from '../../const';
import { showModal } from '../../redux/common/slice';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/recipes/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './RecipeCard.module.css';

export const RecipeCard = ({ recipe, className, isFavorite = false }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogged = () => {
    if (!isLoggedIn) {
      dispatch(showModal(MODALS.AUTH));
      return false;
    }
    return true;
  };

  const handleAuthorClick = () => {
    if (isLogged()) {
      navigate(`${ROUTERS.USER}/${recipe.owner.id}`);
    }
  };

  const handleOnFavoriteClick = () => {
    if (isLogged()) {
      if (isFavorite) {
        dispatch(removeFromFavorites(recipe.id));
      } else {
        dispatch(addToFavorites(recipe.id));
      }
    }
  };

  const handleViewRecipe = () => {
    navigate(`${ROUTERS.RECIPE_DETAIL}/${recipe.id}`);
  };

  return (
    <div className={clsx(css.card, className)}>
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
                src={recipe.owner.avatarURL || '/images/default-avatar.png'}
                alt={`Avatar ${recipe.owner.name}`}
                width={32}
                height={32}
              />
              <p className={css.avatarName}>{recipe.owner.name}</p>
            </button>
          )}

          <div className={css.actions}>
            <button
              className={clsx(css.actionButton, isFavorite && css.active)}
              onClick={handleOnFavoriteClick}
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

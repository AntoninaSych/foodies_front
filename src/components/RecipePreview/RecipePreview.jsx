import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { GoArrowUpRight } from 'react-icons/go';
import { MdDeleteOutline } from 'react-icons/md';
import { ROUTERS } from '../../const';

import css from './RecipePreview.module.css';
import { selectToken } from '../../redux/auth/selectors';
import {
  deleteRecipeFromApi,
  removeRecipeFromFavorites,
} from '../../api/recipesApi';

const RecipePreview = ({ recipe, isFavorite, isOwnProfile = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const { _id, id, title, description, thumb } = recipe;
  const recipeId = _id || id;

  const handleViewRecipe = () => {
    navigate(`${ROUTERS.RECIPE_DETAIL}/${recipe.id}`);
  };

  const handleDelete = () => {
    if (!token) return;
    if (isFavorite) {
      dispatch(removeRecipeFromFavorites({ token, recipeId }));
    } else {
      dispatch(deleteRecipeFromApi({ token, recipeId }));
    }
  };

  return (
    <div className={clsx(css.card)}>
      <div className={css.imageWrapper}>
        <img src={thumb} alt={title} className={css.image} />
      </div>
      <div className={css.content}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.description}>{description}</p>
        <div className={css.actions}>
          <button
            className={css.iconButton}
            onClick={handleViewRecipe}
            aria-label="View recipe"
          >
            <GoArrowUpRight />
          </button>
          {(isFavorite || isOwnProfile) && (
            <button
              className={clsx(css.iconButton, css.trash)}
              onClick={handleDelete}
              aria-label="Delete recipe"
            >
              <MdDeleteOutline />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipePreview;

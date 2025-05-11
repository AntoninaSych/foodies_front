import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { GoArrowUpRight } from 'react-icons/go';
import { MdDeleteOutline } from 'react-icons/md';
import { ROUTERS } from '../../const';
import { selectToken } from '../../redux/auth/selectors';
import {
  deleteRecipeFromApi,
  removeRecipeFromFavorites,
} from '../../api/recipesApi';
import { errorHandler } from '../../utils/notification';
import css from './RecipePreview.module.css';

const RecipePreview = ({
  recipe,
  isFavorites,
  handleRemove,
  handleFavoriteRemove,
  isOwnProfile = false,
}) => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const { id, title, description, thumb } = recipe;

  const handleViewRecipe = () => {
    navigate(`${ROUTERS.RECIPE_DETAIL}/${id}`);
  };

  const handleDelete = async () => {
    if (!token) {
      return;
    }

    if (isFavorites) {
      try {
        await removeRecipeFromFavorites(token, id);
        handleFavoriteRemove(id);
      } catch (error) {
        errorHandler(error);
      }
    } else {
      try {
        await deleteRecipeFromApi(token, id);
        handleRemove(id);
      } catch (error) {
        errorHandler(error);
      }
    }
  };

  return (
    <div className={clsx(css.card)}>
      <div className={css.imageWrapper}>
        <img src={thumb} alt={title} className={css.image} />
      </div>
      <div className={css.content}>
        <div>
          <h4 className={css.title}>{title}</h4>
          <p className={css.description}>{description}</p>
        </div>
        <div className={css.actions}>
          <button
            className={css.iconButton}
            onClick={handleViewRecipe}
            aria-label="View recipe"
          >
            <GoArrowUpRight />
          </button>
          {isOwnProfile && (
            <button
              className={clsx(css.iconButton)}
              onClick={handleDelete}
              aria-label={
                isFavorites ? 'Delete recipe from favorites' : 'Delete recipe'
              }
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

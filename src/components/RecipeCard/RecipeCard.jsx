import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { GoArrowUpRight } from 'react-icons/go';
import { FaRegHeart } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa6';
import css from './RecipeCard.module.css';

// TODO remove background color for images when backend provides them, recipe.thumb, owner.avatarURL
export const RecipeCard = ({
  recipe,
  addFavorite,
  removeFavorite,
  handleAuthorClick,
  isFavorite = false,
}) => {
  const navigate = useNavigate();

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
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
                src={recipe.owner.avatarURL}
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

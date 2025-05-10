import { MdOutlineArrowOutward } from 'react-icons/md';
import { SlTrash } from 'react-icons/sl';
import { useDispatch } from 'react-redux';

import {
  deleteRecipe,
  removeFromFavorites,
} from '../../redux/recipes/operations';

import styles from './RecipePreview.module.css';

const RecipePreview = ({ recipe, listType }) => {
  const dispatch = useDispatch();
  const { _id, id, title, description, thumb } = recipe;
  const recipeId = _id || id;

  const handleDelete = () => {
    const confirmDelete =
      listType === 'recipes'
        ? window.confirm('Are you sure you want to delete this recipe?')
        : true;

    if (!confirmDelete) return;

    if (listType === 'recipes') {
      dispatch(deleteRecipe(recipeId));
    } else if (listType === 'favorites') {
      dispatch(removeFromFavorites(recipeId));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img src={thumb} alt={title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.actions}>
        <a href={`/recipe/${recipeId}`} className={styles.iconBtn}>
          <MdOutlineArrowOutward />
        </a>

        <button type="button" className={styles.iconBtn} onClick={handleDelete}>
          <SlTrash />
        </button>
      </div>
    </div>
  );
};

export default RecipePreview;

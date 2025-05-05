import styles from './RecipeFilters.module.css';
import { useEffect } from 'react';
import { fetchIngredients } from '../../redux/ingredients/operations.js';
import { fetchAreas } from '../../redux/areas/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectIngredients } from '../../redux/ingredients/selectors.js';
import { selectAreas } from '../../redux/areas/selectors.js';

const RecipeFilters = ({
  selectedIngredient,
  selectedArea,
  onFilterChange,
}) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const areas = useSelector(selectAreas);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchAreas());
  }, [dispatch]);

  return (
    <div className={styles.filters}>
      <div className={styles.selectContainer}>
        <select
          className={styles.select}
          value={selectedIngredient}
          onChange={e => onFilterChange('ingredient', e.target.value)}
        >
          <option value="">Ingredients</option>
          {ingredients.map(item => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.selectContainer}>
        <select
          className={styles.select}
          value={selectedArea}
          onChange={e => onFilterChange('area', e.target.value)}
        >
          <option value="">Area</option>
          {areas.map(area => (
            <option key={area.id} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RecipeFilters;

import styles from './RecipeFilters.module.css';

const RecipeFilters = ({
  ingredients = [],
  areas = [],
  selectedIngredient,
  selectedArea,
  onFilterChange,
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.selectContainer}>
        <select
          className={styles.select}
          value={selectedIngredient}
          onChange={e => onFilterChange('ingredient', e.target.value)}
        >
          <option value="">Ingredients</option>
          {ingredients.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
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
          {areas.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RecipeFilters;

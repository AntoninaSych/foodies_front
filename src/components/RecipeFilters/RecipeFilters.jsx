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

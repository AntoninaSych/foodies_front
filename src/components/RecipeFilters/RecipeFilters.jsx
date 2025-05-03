import styles from './RecipeFilters.module.css';

const RecipeFilters = ({
  ingredients = [],
  areas = [],
  selectedIngredient,
  selectedArea,
  onFilterChange,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <select
          className={styles.select}
          value={selectedIngredient}
          onChange={e => onFilterChange('ingredient', e.target.value)}
        >
          <option value="">Ingredients</option>
          {ingredients.map(item => (
            <option key={item} value={item}>
              {item}
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
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RecipeFilters;

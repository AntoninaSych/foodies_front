import styles from './RecipeFilters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { fetchIngredients } from '../../redux/ingredients/operations';
import { fetchAreas } from '../../redux/areas/operations';
import { selectIngredients } from '../../redux/ingredients/selectors';
import { selectAreas } from '../../redux/areas/selectors';
import { FILTER_TYPES } from './const';
import { FieldSelect } from '../Fields';

const RecipeFilters = ({ onFilterChange, areaValue, ingredientValue }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const areas = useSelector(selectAreas);
  const areasOptions = useMemo(
    () => areas.map(({ name }) => ({ value: name, label: name })),
    [areas]
  );
  const ingredientsOptions = useMemo(
    () => ingredients.map(({ name }) => ({ value: name, label: name })),
    [ingredients]
  );

  const handleChangeIngredients = ({ value }) => {
    onFilterChange(FILTER_TYPES.INGREDIENT, value);
  };

  const handleChangeArea = ({ value }) => {
    onFilterChange(FILTER_TYPES.AREA, value);
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchAreas());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <FieldSelect
        name="ingredients"
        placeholder="Ingredients"
        options={[{ value: '', label: 'All Ingredients' }].concat(
          ingredientsOptions
        )}
        value={
          ingredientsOptions.find(option => option.value === ingredientValue) ||
          null
        }
        onChange={handleChangeIngredients}
        isClearable
      />
      <FieldSelect
        name="area"
        placeholder="Area"
        options={[{ value: '', label: 'All Areas' }].concat(areasOptions)}
        value={areasOptions.find(option => option.value === areaValue) || null}
        onChange={handleChangeArea}
        isClearable
      />
    </div>
  );
};

export default RecipeFilters;

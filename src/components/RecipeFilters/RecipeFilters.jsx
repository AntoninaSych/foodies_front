import styles from './RecipeFilters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { fetchIngredients } from '../../redux/ingredients/operations';
import { fetchAreas } from '../../redux/areas/operations';
import { selectIngredients } from '../../redux/ingredients/selectors';
import { selectAreas } from '../../redux/areas/selectors';
import { FILTER_TYPES } from './const';
import { FieldSelect } from '../Fields';

const RecipeFilters = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const areas = useSelector(selectAreas);
  const areasOptions = useMemo(
    () => areas.map(({ id, name }) => ({ value: id, label: name })),
    [areas]
  );
  const ingredientsOptions = useMemo(
    () => ingredients.map(({ id, name }) => ({ value: id, label: name })),
    [ingredients]
  );

  const handleChangeIngredients = ({ label }) => {
    onFilterChange(FILTER_TYPES.INGREDIENT, label);
  };

  const handleChangeArea = ({ label }) => {
    onFilterChange(FILTER_TYPES.AREA, label);
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
        options={ingredientsOptions}
        onChange={handleChangeIngredients}
      />
      <FieldSelect
        name="area"
        placeholder="Area"
        options={areasOptions}
        onChange={handleChangeArea}
      />
    </div>
  );
};

export default RecipeFilters;

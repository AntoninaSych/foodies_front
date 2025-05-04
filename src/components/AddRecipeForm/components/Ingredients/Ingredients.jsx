import { FaPlus } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Button from '../../../Button/Button';
import { FieldInput, FieldSelect } from '../../../Fields';
import css from './Ingredients.module.css';
import IngredientCard from '../../../IngredientCard/IngredientCard';
import ErrorField from '../../../Fields/ErrorField/ErrorField';

const Ingredients = ({
  onChange,
  onDelete,
  ingredients,
  addedIngredients,
  error,
  values,
}) => {
  const [ingredient, setIngredient] = useState(null);
  const [measure, setMeasure] = useState('');
  const options = ingredients.map(category => ({
    value: category.id,
    label: category.name,
  }));

  const handleChangeIngredients = data => {
    setIngredient(data);
  };

  const handleChangeQuantity = data => {
    setMeasure(data);
  };

  const handleOnDelete = id => {
    onDelete(id);
  };

  const handleAdd = () => {
    if (ingredient && measure) {
      onChange({ ingredient, measure });
      setIngredient(null);
      setMeasure('');
    }
  };

  useEffect(() => {
    setIngredient(null);
    setMeasure('');
  }, [values]);

  return (
    <div className={css.wrapper}>
      <div className={css.twoColumns}>
        <FieldSelect
          label="ingredients"
          name="ingredients"
          placeholder="Add the ingredient"
          options={options}
          onChange={handleChangeIngredients}
          value={ingredient}
          error={error}
          notShowErrorMessage
          required
        />
        <FieldInput
          name="quantity"
          placeholder="Enter quantity"
          onChange={handleChangeQuantity}
          value={measure}
          required
        />
      </div>
      {error && (
        <div className={css.errorMessage}>
          <ErrorField>{error}</ErrorField>
        </div>
      )}
      <div className={css.actions}>
        <Button variant="secondary" onClick={handleAdd}>
          ADD INGREDIENT <FaPlus />
        </Button>
      </div>

      <div className={css.wrapperIngredients}>
        {addedIngredients.map(({ id, measure }, index) => {
          const { name, thumb } = ingredients.find(
            ingredient => ingredient.id === id
          );
          const ingredient = { name, thumb, measure };
          return (
            <div key={`${id}-${index}`} className={css.ingredientCardWrapper}>
              <button
                type="button"
                className={css.deleteButton}
                onClick={() => handleOnDelete(id)}
              >
                <IoClose />
              </button>
              <IngredientCard ingredient={ingredient} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ingredients;

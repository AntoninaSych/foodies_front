import { FaPlus } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import Button from '../../../Button/Button';
import { FieldInput, FieldSelect } from '../../../Fields';
import css from './Ingredients.module.css';
import IngredientCard from '../../../IngredientCard/IngredientCard';
import ErrorField from '../../../Fields/ErrorField/ErrorField';

const Ingredients = ({ onChange, ingredients, error }) => {
  const [ingredient, setIngredient] = useState(null);
  const [measure, setMeasure] = useState('');
  const [addedIngredients, setAddedIngredients] = useState([]);
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
    const newIngredients = addedIngredients.filter(i => i.id !== id);
    setAddedIngredients(newIngredients);
    onChange(newIngredients);
  };

  const handleAdd = () => {
    if (ingredient && measure) {
      const newIngredients = [
        ...addedIngredients,
        { id: ingredient.value, measure },
      ];
      setAddedIngredients(newIngredients);
      onChange(newIngredients);
      setIngredient(null);
      setMeasure('');
    }
  };

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

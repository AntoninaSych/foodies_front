import { FaPlus } from 'react-icons/fa6';
import { useState } from 'react';
import Button from '../../../Button/Button';
import { FieldInput, FieldSelect } from '../../../Fields';

import css from './Ingredients.module.css';
import IngredientCard from '../../../IngredientCard/IngredientCard.jsx';

const Ingredients = ({ onChange, ingredients }) => {
  const [ingredient, setIngredient] = useState('');
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

  const handleAdd = () => {
    if (ingredient && measure) {
      const newIngredients = [...addedIngredients, { id: ingredient, measure }];
      setAddedIngredients(newIngredients);
      onChange(newIngredients);
      setIngredient('');
      setMeasure('');
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.twoColumns}>
        <FieldSelect
          label="INGREDIENTS"
          name="ingredients"
          placeholder="Add the ingredient"
          options={options}
          onChange={handleChangeIngredients}
          required
        />
        <FieldInput
          name="quantity"
          placeholder="Enter quantity"
          onChange={handleChangeQuantity}
          required
        />
      </div>
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
          const ingredient = {
            name,
            thumb,
            measure,
          };
          return (
            <IngredientCard key={`${id}-${index}`} ingredient={ingredient} />
          );
        })}
      </div>
    </div>
  );
};

export default Ingredients;

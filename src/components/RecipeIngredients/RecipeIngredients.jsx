import css from './RecipeIngredients.module.css';

const RecipeIngredients = ({ ingredients = [] }) => {
  if (!ingredients.length) {
    return null;
  }

  return (
    <section className={css.ingredientsBlock}>
      <h3 className={css.title}>Ingredients:</h3>
      <ul className={css.ingredientsList}>
        {ingredients.map(ingredient => (
          <li
            key={ingredient.id || ingredient.name}
            className={css.ingredientsItem}
          >
            <img
              src={ingredient.thumb || '/images/default-ingredient.png'}
              alt={ingredient.name}
              className={css.ingredientsImg}
            />
            <div>
              <p className={css.ingredientsName}>{ingredient.name}</p>
              <p className={css.ingredientsMeasure}>{ingredient.measure}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecipeIngredients;

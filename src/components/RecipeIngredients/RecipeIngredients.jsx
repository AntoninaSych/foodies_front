import css from './RecipeIngredients.module.css';

const RecipeIngredients = ({ ingredients = [] }) => {
  if (!ingredients.length) {
    return null;
  }

  return (
    <section className={css.ingredientsBlock}>
      <h2 className={css.sectionTitle}>Ingredients:</h2>
      <ul className={css.ingredientsList}>
        {ingredients.map(ingredient => (
          <li key={ingredient.id || ingredient.name}>
            <div className={css.ingredientsItem}>
              <img
                src={ingredient.thumb || '/placeholder.png'}
                alt={ingredient.name}
                className={css.ingredientsImg}
              />
              <div>
                <p className={css.ingredientsName}>{ingredient.name}</p>
                <p className={css.ingredientsMeasure}>{ingredient.measure}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecipeIngredients;

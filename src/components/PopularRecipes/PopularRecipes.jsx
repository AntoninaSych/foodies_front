import RecipeCard from '../RecipeCard/RecipeCard';
import css from './PopularRecipes.module.css';
import fakeData from './popularrecipes.json';

const PopularRecipes = () => {
  return (
    <section>
      <div className={css.popularWrapper}>
        <h3 className={css.title}>Popular Recipes</h3>
        <ul className={css.list}>
          {fakeData.map(card => (
            <li key={card.id} className={css.listItem}>
              <RecipeCard recipe={card} key={card.id} data={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PopularRecipes;

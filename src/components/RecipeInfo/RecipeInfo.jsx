import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
//import RecipePreparation from '../RecipePreparation/RecipePreparation';
import css from './RecipeInfo.module.css';

const RecipeInfo = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className={css.wrapper}>
      <div className={css.sidebar}><img src={recipe.thumb} alt={recipe.title} /></div>
      <div className={css.content}>
        <RecipeMainInfo recipe={recipe} />
        <RecipeIngredients ingredients={recipe.ingredients} />
        {/*<RecipePreparation steps={recipe.instructions} />*/}
      </div>
    </div>
  );
};

export default RecipeInfo;

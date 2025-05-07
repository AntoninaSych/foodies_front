import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
//import RecipePreparation from '../RecipePreparation/RecipePreparation';

import css from './RecipeInfo.module.css';

const RecipeInfo = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className={css.recipeInfoContainer}>
      <div>
        <RecipeMainInfo recipe={recipe} onUserAvatarClick={() => {}} />
        <RecipeIngredients ingredients={recipe.ingredients} />
      </div>
      {/*<RecipePreparation steps={recipe.instructions} />*/}
    </div>
  );
};

export default RecipeInfo;

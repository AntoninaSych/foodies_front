import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
//import RecipePreparation from '../RecipePreparation/RecipePreparation';
import PopularRecipes from '../PopularRecipes/PopularRecipes';
import Message from '../Message/Message';
import css from './RecipeInfo.module.css';

const RecipeInfo = ({ recipe }) => {
  if (!recipe) {
    return <Message>Recipe not found.</Message>;
  }

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.sidebar}>
          <div className={css.imageWrapper}>
            <img src={recipe.thumb} alt={recipe.title} />
          </div>
        </div>
        <div className={css.content}>
          <RecipeMainInfo recipe={recipe} />
          <RecipeIngredients ingredients={recipe.ingredients} />
          {/*<RecipePreparation steps={recipe.instructions} />*/}
        </div>
      </div>
      <div>
        <PopularRecipes />
      </div>
    </>
  );
};

export default RecipeInfo;

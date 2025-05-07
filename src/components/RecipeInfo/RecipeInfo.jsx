import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import RecipePreparation from '../RecipePreparation/RecipePreparation';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import { recipesDetailFetch } from '../../api/recipesApi';

import css from './RecipeInfo.module.css';

const RecipeInfo = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await recipesDetailFetch(id);
        setRecipe(data);
      } catch {
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Message>{error}</Message>;
  if (!recipe) return null;

  return (
    <div className={css.recipeInfoContainer}>
      <div>
        <RecipeMainInfo recipe={recipe} onUserAvatarClick={() => {}} />
        <RecipeIngredients ingredients={recipe.ingredients} />
      </div>
      <RecipePreparation steps={recipe.instructions} />
    </div>
  );
};

export default RecipeInfo;

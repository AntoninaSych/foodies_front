import { useEffect, useState } from 'react';
import css from './DetailPage.module.css';
import { useParams } from 'react-router-dom';
import { recipesDetailFetch } from '../../api/recipesApi';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';

import PathInfo from '../../components/PathInfo/PathInfo';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
import { errorHandler } from '../../utils/notification.js';
//import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';


const DetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipeData = await recipesDetailFetch (id);
        setRecipe(recipeData);
        // const popularData = await fetchPopularRecipes();
      } catch (error) {
        errorHandler(error, 'Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!recipe) {
    return <div className={css.wrapper}><Container><p>Recipe not found</p></Container></div>;
  }

  return (
    <section className={css.wrapper}>
      <Container>
        <PathInfo breadcrumbs={[{ name: recipe.title }]} />
        <RecipeInfo recipe={recipe} />
      </Container>
    </section>
  );
};

export default DetailPage;
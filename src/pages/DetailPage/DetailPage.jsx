import { useEffect, useState } from 'react';
import css from './DetailPage.module.css';
import { useParams } from 'react-router-dom';
import { recipesDetailFetch } from '../../api/recipesApi';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';

import PathInfo from '../../components/PathInfo/PathInfo';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
//import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';

const DetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const recipeData = await recipesDetailFetch(id);
        setRecipe(recipeData);

        // const popularData = await fetchPopularRecipes();
      } catch {
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Message>{error}</Message>;

  return (
    <section className={css.wrapper}>
      <Container>
        <PathInfo breadcrumbs={[{ name: 'Recipe' }]} />
        <RecipeInfo recipe={recipe} />

        {/*<PopularRecipes recipes={popularRecipes}  />*/}
      </Container>
    </section>
  );
};

export default DetailPage;

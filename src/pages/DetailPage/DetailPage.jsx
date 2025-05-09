import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { recipesDetailFetch } from '../../api/recipesApi';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import PathInfo from '../../components/PathInfo/PathInfo';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
import { errorHandler } from '../../utils/notification';
import css from './DetailPage.module.css';

const DetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipeData = await recipesDetailFetch(id);
        setRecipe(recipeData);
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

  return (
    <section className={css.wrapper}>
      <Container>
        <PathInfo breadcrumbs={[{ name: recipe?.title }]} />
        <RecipeInfo recipe={recipe} />
      </Container>
    </section>
  );
};

export default DetailPage;

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

const mockRecipe = {
  id: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  title: 'Chicken Curry',
  description: 'Delicious spicy chicken curry recipe.',
  instructions: 'Mix spices, cook chicken, and simmer for 30 minutes.',
  thumb: 'https://example.com/images/chicken-curry.jpg',
  time: 45,
  area: {
    id: 'b2a3c4d5-f6g7-8h9i-j0k1-l2m3n4o5p6q7',
    name: 'Indian',
  },
  owner: {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'John Doe',
    email: 'john@example.com',
  },
  ingredients: [
    {
      id: '789e0123-f456-789a-bcde-1234567890ab',
      name: 'Chicken',
      thumb:
        'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3824.png',
    },
    {
      id: '228855e1-0635-4438-9fe2-527a3bd7b6a2',
      name: 'Rose water',
      thumb:
        'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e386c.png',
    },
  ],
};

const DetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(mockRecipe);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipeData = await recipesDetailFetch(id);
        setRecipe(recipeData);
        // const popularData = await fetchPopularRecipes();
      } catch (error) {
        errorHandler(error, 'Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    if (id === 'TEST') {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className={css.wrapper}>
      <Container>
        <PathInfo breadcrumbs={[{ name: recipe.title }]} />
        {recipe && <RecipeInfo recipe={recipe} />}
        {/*<PopularRecipes recipes={popularRecipes}  />*/}
      </Container>
    </section>
  );
};

export default DetailPage;

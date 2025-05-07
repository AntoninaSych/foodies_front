import { useEffect, useState } from 'react';
import css from './DetailPage.module.css';
import { useParams } from 'react-router-dom';
//import { recipesDetailFetch } from '../../api/recipesApi';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';

import PathInfo from '../../components/PathInfo/PathInfo';
import RecipeInfo from '../../components/RecipeInfo/RecipeInfo';
//import PopularRecipes from '../../components/PopularRecipes/PopularRecipes';

const mokrecipe = {
  id: '37d2d47b-cb9a-4903-a92c-8c4a8194143b',
  title: 'Shawarma',
  description:
    'A Middle Eastern wrap filled with tender strips of marinated meat',
  instructions:
    'Combine the marinade ingredients in a large ziplock bag (or bowl).\r\nAdd the chicken and use your hands to make sure each piece is coated. If using a ziplock bag, I find it convenient to close the bag then massage the bag to disperse the rub all over each chicken piece.\r\nMarinate overnight or up to 24 hours.\r\nCombine the Yoghurt Sauce ingredients in a bowl and mix. Cover and put in the fridge until required (it will last for 3 days in the fridge).\r\nHeat grill/BBQ (or large heavy based pan on stove) on medium high. You should not need to oil it because the marinade has oil in it and also thigh fillets have fat. But if you are worried then oil your hotplate/grill. (See notes for baking)\r\nPlace chicken on the grill and cook the first side for 4 to 5 minutes until nicely charred, then turn and cook the other side for 3 to 4 minutes (the 2nd side takes less time).\r\nRemove chicken from the grill and cover loosely with foil. Set aside to rest for 5 minutes.\r\nTO SERVE\r\nSlice chicken and pile onto platter alongside flatbreads, Salad and the Yoghurt Sauce.\r\nTo make a wrap, get a piece of flatbread and smear with Yoghurt Sauce. Top with a bit of lettuce and tomato and Chicken Shawarma. Roll up and enjoy!',
  thumb: 'http://localhost:5000/public/images/recipies/Shawarma.jpg',
  time: '24',
  areaId: '104f50b1-1efe-4ab7-8e1b-ead3a2020988',
  ownerId: 'd26b9a3f-81ed-401e-9011-9d03dfac52db',
  categoryId: '17163542-9eb1-4f45-849c-3a60a72d442e',
  createdAt: '2025-05-07T19:22:10.655Z',
  updatedAt: '2025-05-07T19:22:10.655Z',
  area: {
    id: '104f50b1-1efe-4ab7-8e1b-ead3a2020988',
    name: 'Egyptian',
  },
  owner: {
    id: 'd26b9a3f-81ed-401e-9011-9d03dfac52db',
    name: 'Foodies Admin',
    email: 'admin@foodies.com',
  },
  category: {
    id: '17163542-9eb1-4f45-849c-3a60a72d442e',
    name: 'Chicken',
    thumb: 'images/categories/Chicken.jpg',
  },
};

const DetailPage = () => {
  const { id } = useParams();
  const [recipe] = useState(mokrecipe);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // const recipeData = await recipesDetailFetch(id);
        // setRecipe(recipeData);

        // const popularData = await fetchPopularRecipes();
      } catch {
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Message>{error}</Message>;

  return (
    <section className={css.wrapper}>
      <Container>
        <PathInfo breadcrumbs={[{ name: recipe.title }]} />
        <RecipeInfo recipe={recipe} />

        {/*<PopularRecipes recipes={popularRecipes}  />*/}
      </Container>
    </section>
  );
};

export default DetailPage;

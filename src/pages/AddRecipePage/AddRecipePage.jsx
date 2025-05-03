import { useEffect } from 'react';
import Container from '../../components/Container/Container';
import css from './AddRecipePage.module.css';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';
import { recipeAdd } from '../../api/recipesApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../redux/auth/selectors';
import { fetchCategories } from '../../redux/categories/operations';
import { fetchIngredients } from '../../redux/ingredients/operations';
import PathInfo from '../../components/PathInfo/PathInfo.jsx';
import MainTitle from '../../components/MainTitle/MainTitle.jsx';
import Subtitle from '../../components/Subtitle/Subtitle.jsx';

const AddRecipePage = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const onSubmit = async data => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('time', data.time);
    formData.append('category', data.category);
    formData.append('instructions', data.instructions);
    formData.append('ingredients', JSON.stringify(data.ingredients));
    data.thumb && formData.append('thumb', data.thumb.name);

    try {
      await recipeAdd(token, formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={css.wrapper}>
      <Container>
        <PathInfo breadcrumbs={[{ name: 'add recipe' }]} />
        <MainTitle>Add recipe</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
        <AddRecipeForm onSubmit={onSubmit} />
      </Container>
    </div>
  );
};

export default AddRecipePage;

import Container from '../../components/Container/Container';
import css from './AddRecipePage.module.css';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';
import { recipeAdd } from '../../api/recipesApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../redux/auth/selectors';
import { useEffect } from 'react';
import { fetchCategories } from '../../redux/categories/operations';
import { fetchIngredients } from '../../redux/ingredients/operations';

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
        <div>HOME / ADD RECIPE</div>
        <h2>Add recipe page</h2>
        <div>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </div>
        <AddRecipeForm onSubmit={onSubmit} />
      </Container>
    </div>
  );
};

export default AddRecipePage;

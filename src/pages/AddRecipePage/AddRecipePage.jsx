import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container/Container';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';
import { recipeAdd } from '../../api/recipesApi';
import { selectToken, selectUser } from '../../redux/auth/selectors';
import { fetchCategories } from '../../redux/categories/operations';
import { fetchIngredients } from '../../redux/ingredients/operations';
import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import { ROUTERS } from '../../const';
import { errorHandler, successNotification } from '../../utils/notification';
import css from './AddRecipePage.module.css';

const AddRecipePage = () => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const onSubmit = async (data, form) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('instructions', data.instructions);
    formData.append('time', data.time);
    formData.append('categoryId', data.category?.value);
    formData.append('ingredients', JSON.stringify(data.ingredients));
    formData.append('thumb', data.thumb);
    data.area && formData.append('areaId', data.area?.value);
    form.target.reset();

    try {
      await recipeAdd(token, formData);
      // TODO redirect to user/:id, id is still not available at the current user endpoint
      navigate(`${ROUTERS.USER}/${user.id}`, { state: location });
      successNotification('New recipe successfully added!');
    } catch (error) {
      errorHandler(error, 'Error while adding a new recipe.');
    }
  };

  return (
    <section className={css.wrapper}>
      <Container>
        <PathInfo breadcrumbs={[{ name: 'add recipe' }]} />
        <MainTitle>Add recipe</MainTitle>
        <Subtitle>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </Subtitle>
        <AddRecipeForm onSubmit={onSubmit} />
      </Container>
    </section>
  );
};

export default AddRecipePage;

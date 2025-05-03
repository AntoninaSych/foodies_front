import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container/Container';
import css from './AddRecipePage.module.css';
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';
import { recipeAdd } from '../../api/recipesApi';

import { selectToken, selectUser } from '../../redux/auth/selectors';
import { fetchCategories } from '../../redux/categories/operations';
import { fetchIngredients } from '../../redux/ingredients/operations';
import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import { ROUTERS } from '../../const/index';

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
    data.area && formData.append('areaId', data.area?.value);
    data.thumb && formData.append('thumb', data.thumb.name);
    form.target.reset();

    try {
      await recipeAdd(token, formData);
      // TODO redirect to user/:id
      navigate(`${ROUTERS.USER}/${user.id}`, { state: location });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={css.wrapper}>
      <Container>
        <PathInfo breadcrumbs={[{ name: 'add recipe' }]} />
        <MainTitle>Add recipe (DRAFT!)</MainTitle>
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

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '../../redux/categories/operations';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import {
  selectCategories,
  selectError,
  selectLoading,
} from '../../redux/categories/selectors';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import css from './Categories.module.css';

const Categories = ({ handleChangeCategory }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const categories = useSelector(selectCategories);
  const hasData = categories.length > 0;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section>
      <MainTitle>Categories</MainTitle>
      <Subtitle className={css.subtitle}>
        Discover a limitless world of culinary possibilities and enjoy exquisite
        recipes that combine taste, style and the warm atmosphere of the
        kitchen.
      </Subtitle>
      {error && <Message>{error}</Message>}
      {!error && !hasData && <Message>No categories found.</Message>}
      {!error && hasData && (
        <CategoriesList
          handleChangeCategory={handleChangeCategory}
          categories={categories}
        />
      )}
    </section>
  );
};

export default Categories;

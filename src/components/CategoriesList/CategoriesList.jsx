import { useSelector } from 'react-redux';
import {
  selectLoading,
  selectError,
  selectCategories,
} from '../../redux/categories/selectors';
import css from './CategoriesList.module.css';
import CategoryCard from '../CategoryCard/CategoryCard';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';

const CategoriesList = () => {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const categories = useSelector(selectCategories);
  const compareCategories = (a, b) => {
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
  };

  const sortedCategories = [...categories].sort(compareCategories);

  if (loading) {
    return <Loader />;
  }

  return (
    <ul className={css.wrapper}>
      {error && <Message>{error}</Message>}
      {sortedCategories.map(card => (
        <CategoryCard key={card.id} data={card} />
      ))}
    </ul>
  );
};

export default CategoriesList;

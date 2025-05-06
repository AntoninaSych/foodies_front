import { useDispatch } from 'react-redux';
import { useMemo, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import CategoryCard from '../CategoryCard/CategoryCard';
import { fetchRecipes } from '../../redux/recipes/operations';
import { errorNotification } from '../../utils/notification';
import Button from '../Button/Button';
import css from './CategoriesList.module.css';

const CategoriesList = ({ categories, handleChangeCategory }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [limit, setLimit] = useState(isMobile ? 7 : 10);
  const dispatch = useDispatch();
  const sortedCategories = useMemo(() => {
    const sorted = []
      .concat(categories)
      .sort((a, b) => (a.name > b.name ? 1 : -1));

    return limit ? sorted.slice(0, limit + 1) : sorted;
  }, [categories, limit]);
  const showAll = sortedCategories.length !== categories.length;

  const handleOnCategoryClick = category => {
    if (category) {
      dispatch(fetchRecipes({ category }))
        .unwrap()
        .then(() => {
          handleChangeCategory(category);
        })
        .catch(error => {
          errorNotification(error);
        });
    }
  };

  const handleOnShowAll = () => {
    setLimit(0);
  };

  return (
    <ul className={css.wrapper}>
      {sortedCategories.map(card => (
        <CategoryCard
          handleOnCLick={handleOnCategoryClick}
          key={card.id}
          data={card}
        />
      ))}
      {showAll && (
        <li className={css.showAll}>
          <Button onClick={handleOnShowAll} className={css.btnLoadAll}>
            All categories
          </Button>
        </li>
      )}
    </ul>
  );
};

export default CategoriesList;

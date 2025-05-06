import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '../../redux/categories/operations';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import Button from '../Button/Button';

import styles from './Categories.module.css';

const Categories = ({ handleChangeCategory }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className={styles.categorySection}>
      <MainTitle className={styles.title}>Categories</MainTitle>
      <Subtitle className={styles.subtitle}>
        Discover a limitless world of culinary possibilities and enjoy exquisite
        recipes that combine taste, style and the warm atmosphere of the
        kitchen.
      </Subtitle>
      <CategoriesList handleChangeCategory={handleChangeCategory} />
      <Button className={styles.btnLoadAll}>All categories</Button>
    </section>
  );
};

export default Categories;

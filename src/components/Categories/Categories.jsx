import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import Button from '../Button/Button';

import styles from './Categories.module.css';

const Categories = () => {
  return (
    <section className={styles.categorySection}>
      <MainTitle className={styles.title}>Categories</MainTitle>
      <Subtitle className={styles.subtitle}>
        Discover a limitless world of culinary possibilities and enjoy exquisite
        recipes that combine taste, style and the warm atmosphere of the
        kitchen.
      </Subtitle>
      <CategoriesList />
      <Button className={styles.btnLoadAll}>All categories</Button>
    </section>
  );
};

export default Categories;

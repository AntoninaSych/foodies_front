import { useState } from 'react';
import Container from '../../components/Container/Container';
import Categories from '../../components/Categories/Categories';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Recipes from '../../components/Recipes/Recipes';
import { THEMES } from '../../const';
import css from './HomePage.module.css';

const HomePage = () => {
  const [category, setCategory] = useState(null);

  const handleChangeCategory = value => {
    setCategory(value);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <Container>
          <Header theme={THEMES.DARK} />
          <Hero />
        </Container>
      </div>
      <div className={css.main}>
        <Container>
          {!category ? (
            <Categories handleChangeCategory={handleChangeCategory} />
          ) : (
            <Recipes category={category} onBack={() => setCategory(null)} />
          )}
        </Container>
      </div>
    </div>
  );
};

export default HomePage;

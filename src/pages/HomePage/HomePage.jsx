import { Suspense, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';

import { THEMES } from '../../const';
import css from './HomePage.module.css';
import Testimonials from '../../components/Testimonials/Testimonials.jsx';

const Recipes = lazy(() => import('../../components/Recipes/Recipes'));
const Categories = lazy(() => import('../../components/Categories/Categories'));

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const handleChangeCategory = category => {
    setSearchParams({ category });
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
          <Suspense>
            {!category ? (
              <Categories handleChangeCategory={handleChangeCategory} />
            ) : (
              <Recipes category={category} />
            )}
          </Suspense>
          <Testimonials />
        </Container>
      </div>
    </div>
  );
};

export default HomePage;

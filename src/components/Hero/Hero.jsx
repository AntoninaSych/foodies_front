import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { MODALS, ROUTERS } from '../../const';
import styles from './Hero.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { showModal } from '../../redux/common/slice';

const Hero = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleOnAddRecipe = () => {
    if (!isLoggedIn) {
      return dispatch(showModal(MODALS.AUTH));
    }

    navigate(ROUTERS.ADD_RECIPE);
  };

  return (
    <section className={styles.heroSection}>
      <div>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>Improve Your Culinary Talents</h1>
          <p className={styles.subtitle}>
            Amazing recipes for beginners in the world of cooking, enveloping
            you in the aromas and tastes of various cuisines.
          </p>
          <Button
            onClick={handleOnAddRecipe}
            className={styles.heroButton}
            variant={Button.variants.SECONDARY_REVERSED}
          >
            Add recipe
          </Button>
        </div>

        <div className={styles.imgWrapper}>
          <img
            srcSet="
              /images/hero/hero-dish2-1x.png 1x,
              /images/hero/hero-dish2-2x.png 2x"
            src="/images/hero/hero-dish2-1x.png"
            alt="Meat pie"
            className={styles.imgSmall}
          />
          <img
            srcSet="
              /images/hero/hero-dish1-1x.png 1x,
              /images/hero/hero-dish1-2x.png 2x"
            src="/images/hero/hero-dish1-1x.png"
            alt="Chocolate pudding"
            className={styles.imgLarge}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

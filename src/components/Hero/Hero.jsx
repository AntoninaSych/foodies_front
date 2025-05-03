import Button from '../../components/Button/Button';
import { ROUTERS } from '../../const';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroThumb}>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>Improve Your Culinary Talents</h1>
          <p className={styles.subtitle}>
            Amazing recipes for beginners in the world of cooking, enveloping
            you in the aromas and tastes of various cuisines.
          </p>
          <Button
            className={styles.heroButton}
            to={ROUTERS.ADD_RECIPE}
            variant={Button.variants.SECONDARY_REVERSED}
          >
            Add recipe
          </Button>
        </div>

        <div className={styles.imgWrapper}>
          <img
            src="/images/hero/hero-dish2-1x.png"
            alt="Meat pie"
            className={styles.imgSmall}
          />
          <img
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

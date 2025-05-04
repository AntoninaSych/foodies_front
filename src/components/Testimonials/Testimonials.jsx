import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Testimonials.module.css';
import {
  selectError,
  selectLoading,
  selectTestimonials,
} from '../../redux/testimonials/selectors.js';
import { fetchTestimonials } from '../../redux/testimonials/operations.js';
import Loader from '../Loader/Loader.jsx';
import css from '../CategoriesList/CategoriesList.module.css';
import Message from '../Message/Message.jsx';

const AUTO_SLIDE_INTERVAL = 5000;

const Testimonials = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector(selectTestimonials);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  useEffect(() => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex(prev => prev % testimonials.length);
    }
  }, [testimonials]);

  useEffect(() => {
    if (testimonials && testimonials.length > 0) {
      intervalRef.current = setInterval(() => {
        slideTo((currentIndex + 1) % testimonials.length);
      }, AUTO_SLIDE_INTERVAL);
    }
    return () => clearInterval(intervalRef.current);
  }, [testimonials, currentIndex]);

  const slideTo = index => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 300);
  };

  const handleDotClick = index => {
    clearInterval(intervalRef.current);
    slideTo(index);
  };

  if (loading) return <Loader />;

  return (
    <div className={css.wrapper}>
      {error && <Message>{error}</Message>}

      <div className={styles.section}>
        <p className={styles.subtitle}>What our customers say</p>
        <h2 className={styles.title}>TESTIMONIALS</h2>
        <svg className={styles.icon} aria-hidden="true">
          <use xlinkHref={`/sprite.svg#quote`} />
        </svg>

        {(!testimonials || testimonials.length === 0) && (
          <div className={styles.center}>
            There are no testimonials here yet.
          </div>
        )}

        {testimonials && testimonials.length > 0 && (
          <div
            className={`${styles.slide} ${fade ? styles.fadeIn : styles.fadeOut}`}
          >
            <p className={styles.quote}>
              “{testimonials[currentIndex]?.text ?? 'Loading…'}”
            </p>
            <p className={styles.author}>
              {testimonials[currentIndex]?.author ?? ''}
            </p>
          </div>
        )}
        <div>
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${currentIndex === idx ? styles.active : ''}`}
              onClick={() => handleDotClick(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

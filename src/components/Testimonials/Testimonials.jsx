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
  const timeoutRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  useEffect(() => {
    setCurrentIndex(0);
    indexRef.current = 0;
  }, [testimonials]);

  useEffect(() => {
    if (testimonials.length > 1) {
      intervalRef.current = setInterval(() => {
        const nextIndex = (indexRef.current + 1) % testimonials.length;
        slideTo(nextIndex);
      }, AUTO_SLIDE_INTERVAL);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [testimonials.length]);

  const slideTo = index => {
    clearTimeout(timeoutRef.current);
    setFade(false);
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(index);
      indexRef.current = index;
      setFade(true);
    }, 300);
  };

  const handleDotClick = index => {
    clearInterval(intervalRef.current);
    slideTo(index);
  };

  if (loading) return <Loader />;
  if (error) return <Message>{error}</Message>;

  if (testimonials.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.center}>There are no testimonials here yet.</div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <p className={styles.subtitle}>What our customers say</p>
        <h2 className={styles.title}>TESTIMONIALS</h2>
        <svg className={styles.icon} aria-hidden="true">
          <use href="/sprite.svg#quote" />
        </svg>

        <div className={styles.slide} aria-live="polite">
          <div className={fade ? styles.fadeIn : styles.fadeOut}>
            <p className={styles.quote}>
              “{testimonials[currentIndex]?.testimonial ?? 'Loading…'}”
            </p>
            <p className={styles.author}>
              {testimonials[currentIndex]?.author ?? ''}
            </p>
          </div>
        </div>

        <div>
          {testimonials.map((testimonial, idx) => (
            <button
              key={testimonial.id ?? idx}
              className={`${styles.dot} ${currentIndex === idx ? styles.active : ''}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

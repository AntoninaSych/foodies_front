import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectTestimonials,
} from '../../redux/testimonials/selectors';
import { fetchTestimonials } from '../../redux/testimonials/operations';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import styles from './Testimonials.module.css';

const AUTO_SLIDE_INTERVAL = 5000;

const Testimonials = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector(selectTestimonials);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
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
        const next = (indexRef.current + 1) % testimonials.length;
        setCurrentIndex(next);
        indexRef.current = next;
      }, AUTO_SLIDE_INTERVAL);
    }
    return () => clearInterval(intervalRef.current);
  }, [testimonials.length]);

  const handleDotClick = idx => {
    clearInterval(intervalRef.current);
    setCurrentIndex(idx);
    indexRef.current = idx;
  };

  if (loading) return <Loader />;
  if (error) return <Message>{error}</Message>;
  if (testimonials.length === 0)
    return (
      <div className={styles.wrapper}>
        <div className={styles.center}>There are no testimonials here yet.</div>
      </div>
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <p className={styles.subtitle}>What our customers say</p>
        <h2 className={styles.title}>TESTIMONIALS</h2>
        <svg className={styles.icon} aria-hidden="true">
          <use href="/sprite.svg#quote" />
        </svg>

        <div className={styles.slider}>
          <div
            className={styles.slides}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
            aria-live="polite"
          >
            {testimonials.map(({ id, testimonial, author }) => (
              <div key={id} className={styles.slideItem}>
                <p className={styles.quote}>&ldquo;{testimonial}&rdquo;</p>
                <p className={styles.author}>{author}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${
                currentIndex === idx ? styles.active : ''
              }`}
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

import clsx from 'clsx';
import css from './Subtitle.module.css';

const Subtitle = ({ children, className }) => {
  return <p className={clsx(css.text, className)}>{children}</p>;
};

export default Subtitle;

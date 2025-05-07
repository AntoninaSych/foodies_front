import css from './Subtitle.module.css';

const Subtitle = ({ children, className }) => {
  return <p className={`${css.text} ${className}`}>{children}</p>;
};

export default Subtitle;

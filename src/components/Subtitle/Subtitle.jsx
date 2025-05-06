import css from './Subtitle.module.css';

const Subtitle = ({ children, className }) => {
  return <p className={className ?? css.text}>{children}</p>;
};

export default Subtitle;

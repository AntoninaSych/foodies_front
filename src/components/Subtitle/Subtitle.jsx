import css from './Subtitle.module.css';

const Subtitle = ({ children }) => {
  return <p className={css.text}>{children}</p>;
};

export default Subtitle;

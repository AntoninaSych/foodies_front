import css from './MainTitle.module.css';

const MainTitle = ({ children, className }) => {
  return <h2 className={className ?? css.title}>{children}</h2>;
};

export default MainTitle;

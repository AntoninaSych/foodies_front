import { Link } from 'react-router-dom';
import clsx from 'clsx';
import css from './Logo.module.css';

const Logo = ({ theme }) => {
  const classNames = clsx(css.logo, theme && css[theme]);

  return (
    <Link to="/" className={classNames}>
      foodies
    </Link>
  );
};

export default Logo;

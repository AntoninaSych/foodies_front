import { Link, useLocation } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <Link
      to="/"
      className={`${styles.logo} ${
        isHome ? styles.logoHome : styles.logoInner
      }`}
    >
      foodies
    </Link>
  );
};

export default Logo;

import clsx from 'clsx';
import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import css from './Header.module.css';
import { useSelector } from 'react-redux';
import AuthBar from '../AuthBar/AuthBar';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Logo from '../Logo/Logo';

const Header = ({ theme }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const className = clsx(css.header, theme && css[theme]);

  return (
    <header className={className}>
      <Container>
        <div className={css.wrapper}>
          <div className={css.brand}>
            <Logo theme={theme} />
          </div>
          <div className={css.nav}>
            {isLoggedIn ? (
              <Navigation theme={theme} />
            ) : (
              <AuthBar theme={theme} />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

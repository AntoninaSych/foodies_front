import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Container from '../Container/Container';
import Nav from '../Nav/Nav';
import AuthBar from '../AuthBar/AuthBar';
import UserBar from '../UserBar/UserBar';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Logo from '../Logo/Logo';
import css from './Header.module.css';

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

          {isLoggedIn ? (
            <>
              <Nav theme={theme} />
              <UserBar theme={theme} />
            </>
          ) : (
            <AuthBar theme={theme} />
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;

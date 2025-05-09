import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { useMediaQuery } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { ROUTERS, THEMES } from '../../const';
import Logo from '../Logo/Logo';
import css from '../styles/navigation.module.css';

const buildClassName = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Nav = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const className = clsx(css.wrapper, theme && css[theme]);

  const handleOnMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOnCloseClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isMobile) {
      document.body.classList.remove('mobile-open');
    } else {
      if (isOpen) {
        document.body.classList.add('mobile-open');
      } else {
        document.body.classList.remove('mobile-open');
      }
    }
  }, [isMobile, isOpen]);

  return (
    <div className={className}>
      <button
        className={clsx(css.menuButton, css.menuButtonOpen)}
        type="button"
        aria-label="Open menu"
        onClick={handleOnMenuClick}
      >
        <IoMdMenu />
      </button>
      <div className={clsx(css.mobileMenuContainer, isOpen && css.isOpen)}>
        <div className={css.mobileMenuOverlay} />
        <div className={css.mobileMenu}>
          <div className={css.mobileMenuHeader}>
            <Logo theme={THEMES.DARK} />
            <button
              className={clsx(css.menuButton, css.menuButtonClose)}
              type="button"
              aria-label="Close menu"
              onClick={handleOnCloseClick}
            >
              <IoClose />
            </button>
          </div>
          <nav className={css.nav}>
            <NavLink className={buildClassName} to={ROUTERS.HOME}>
              Home
            </NavLink>
            <NavLink className={buildClassName} to={ROUTERS.ADD_RECIPE}>
              Add recipe
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Nav;

import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { useMediaQuery } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { ROUTERS, THEMES } from '../../const';
import Logo from '../Logo/Logo';
import cssNavigation from '../styles/navigation.module.css';
import css from './Nav.module.css';

const buildClassName = ({ isActive }) => {
  return clsx(cssNavigation.link, isActive && cssNavigation.active);
};

const Nav = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const className = clsx(cssNavigation.wrapper, theme && cssNavigation[theme]);

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
        className={clsx(cssNavigation.menuButton, cssNavigation.menuButtonOpen)}
        type="button"
        aria-label="Open menu"
        onClick={handleOnMenuClick}
      >
        <IoMdMenu />
      </button>
      <div
        className={clsx(
          cssNavigation.mobileMenuContainer,
          isOpen && cssNavigation.isOpen,
          !isOpen && cssNavigation.isClose
        )}
      >
        <div className={cssNavigation.mobileMenuOverlay} />
        <div className={cssNavigation.mobileMenu}>
          <div className={cssNavigation.mobileMenuHeader}>
            <Logo theme={THEMES.DARK} />
            <button
              className={clsx(
                cssNavigation.menuButton,
                cssNavigation.menuButtonClose
              )}
              type="button"
              aria-label="Close menu"
              onClick={handleOnCloseClick}
            >
              <IoClose />
            </button>
          </div>
          <nav className={cssNavigation.nav}>
            <NavLink
              onClick={handleOnCloseClick}
              className={buildClassName}
              to={ROUTERS.HOME}
            >
              Home
            </NavLink>
            <NavLink
              onClick={handleOnCloseClick}
              className={buildClassName}
              to={ROUTERS.ADD_RECIPE}
            >
              Add recipe
            </NavLink>
          </nav>

          <div className={cssNavigation.mobileMenuFooter}>
            <img
              srcSet="
              /images/hero/hero-dish2-1x.png 1x,
              /images/hero/hero-dish2-2x.png 2x"
              src="/images/hero/hero-dish2-1x.png"
              alt="Meat pie"
              className={css.imgSmall}
            />
            <img
              srcSet="
              /images/hero/hero-dish1-1x.png 1x,
              /images/hero/hero-dish1-2x.png 2x"
              src="/images/hero/hero-dish1-1x.png"
              alt="Chocolate pudding"
              className={css.imgLarge}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;

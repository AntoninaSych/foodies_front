import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { ROUTERS } from '../../const';
import css from '../styles/navigation.module.css';

const buildClassName = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Nav = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const className = clsx(css.wrapper, theme && css[theme]);

  const handleOnMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOnCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <button
        className={css.menuButton}
        type="button"
        aria-label="Open menu"
        onClick={handleOnMenuClick}
      >
        <IoMdMenu />
      </button>
      <div className={clsx(css.mobileMenuContainer, isOpen && css.isOpen)}>
        <div className={css.mobileMenuOverlay} />
        <div className={css.mobileMenu}>
          <button
            className={css.menuButton}
            type="button"
            aria-label="Close menu"
            onClick={handleOnCloseClick}
          >
            <IoClose />
          </button>
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

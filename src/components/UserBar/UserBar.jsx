import clsx from 'clsx';
import { FaAngleDown } from 'react-icons/fa6';
import { GoArrowUpRight } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MODALS, ROUTERS } from '../../const';
import { selectUser } from '../../redux/auth/selectors';
import { showModal } from '../../redux/common/slice';
import css from './UserBar.module.css';
import cssNavigation from '../styles/navigation.module.css';

const UserBar = ({ theme }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { name, id, avatarURL } = useSelector(selectUser);

  const className = clsx(css.placeholder, theme && css[theme]);

  const handleLogout = () => {
    dispatch(showModal(MODALS.LOGOUT));
  };

  const handleOnOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={css.wrapper}>
      <div className={className}>
        <img
          className={css.avatar}
          src={avatarURL.toString()}
          width={50}
          height={50}
          alt="avatar"
        />
        <div className={css.name}>{name}</div>
        <FaAngleDown
          className={clsx(css.dropdown, open && css.active)}
          onClick={handleOnOpen}
        />

        <div className={clsx(css.menu, open && css.active)}>
          <NavLink
            className={clsx(cssNavigation.link, css.link)}
            to={`${ROUTERS.USER}/${id}`}
          >
            PROFILE
          </NavLink>
          <a
            className={clsx(cssNavigation.link, css.link)}
            href="#"
            onClick={handleLogout}
          >
            LOG OUT <GoArrowUpRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserBar;

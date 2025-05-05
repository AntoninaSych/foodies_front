import clsx from 'clsx';
import { FaAngleDown } from 'react-icons/fa6';
import { GoArrowUpRight } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { ROUTERS } from '../../../../const';
import css from './Account.module.css';
import cssNavigation from '../../../styles/navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../../redux/auth/selectors';
import { logout } from '../../../../redux/auth/operations';
import Modal from '../../../Modal/Modal';
import LogoutDialog from '../../../LogoutDialog/LogoutDialog';

const Account = ({ theme }) => {
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const { name, id, avatarURL } = useSelector(selectUser);

  const className = clsx(css.placeholder, theme && css[theme]);

  const handleLogout = () => {
    setShowDialog(true);
  };

  const onDialogSubmit = event => {
    event.preventDefault();
    dispatch(logout());
  };

  const handleOnOpen = () => {
    setOpen(!open);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
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

      <Modal open={showDialog} onClose={handleCloseDialog}>
        <LogoutDialog onSubmit={onDialogSubmit} onCancel={handleCloseDialog} />
      </Modal>
    </>
  );
};

export default Account;

import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import css from './LogOutModal.module.css';
import { logout } from '../../redux/auth/operations';
import { clearFavorites } from '../../redux/recipes/slice';
import cssModal from '../styles/modal.module.css';

const LogOutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const title = isMobile ? 'LOG OUT' : 'ARE YOU LOGGING OUT?';

  const onSubmit = () => {
    dispatch(logout());
    dispatch(clearFavorites());
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={cssModal.wrapper}>
        <h2 className={clsx(cssModal.title, css.title)}>{title}</h2>
        <div className={css.wrapper}>
          <p className={css.description}>
            You can always log back in at my time.
          </p>
          <div className={css.actions}>
            <Button variant="primary" onClick={onSubmit}>
              LOG OUT
            </Button>
            <Button variant="secondary" onClick={onClose}>
              CANCEL
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;

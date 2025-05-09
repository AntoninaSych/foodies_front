import { useState } from 'react';
import Link from '../Link/Link';
import Modal from '../Modal/Modal';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from '../SignInForm/SignInForm';
import css from '../styles/modal.module.css';
import { FORM_TYPES } from '../../const';

const AuthModal = ({ isOpen, onClose, defaultValue = FORM_TYPES.SIGN_IN }) => {
  const [form, setForm] = useState(defaultValue);
  const showSignInForm = form === FORM_TYPES.SIGN_IN;

  const handleChangeForm = formType => () => {
    setForm(formType);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      {showSignInForm ? (
        <div className={css.wrapper}>
          <h2 className={css.title}>SIGN IN</h2>
          <SignInForm onSuccess={onClose} />

          <div className={css.footer}>
            <span>Don&#39;t have an account?</span>{' '}
            <Link onClick={handleChangeForm(FORM_TYPES.SIGN_UP)}>
              Create an account
            </Link>
          </div>
        </div>
      ) : (
        <div className={css.wrapper}>
          <h2 className={css.title}>SIGN UP</h2>
          <SignUpForm onSuccess={onClose} />

          <div className={css.footer}>
            <span>I already have an account?</span>{' '}
            <Link onClick={handleChangeForm(FORM_TYPES.SIGN_IN)}>Sign in</Link>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;

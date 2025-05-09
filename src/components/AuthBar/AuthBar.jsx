import clsx from 'clsx';
import { useState } from 'react';
import Button from '../Button/Button';
import css from '../styles/navigation.module.css';
import AuthModal from '../AuthModal/AuthModal.jsx';
import { FORM_TYPES } from '../AuthModal/const';

const AuthBar = ({ theme }) => {
  const [form, setForm] = useState(null);
  const className = clsx(css.wrapper, theme && css[theme]);

  const handleClick = form => () => {
    setForm(form);
  };

  const handleOnClose = () => {
    setForm(null);
  };

  const handleChangeForm = action => () => {
    setForm(action);
  };

  return (
    <div className={className}>
      <div className={css.placeholder}>
        <Button onClick={handleClick(FORM_TYPES.SIGN_IN)}>SIGN IN</Button>
        <Button
          className={css.active}
          onClick={handleClick(FORM_TYPES.SIGN_UP)}
        >
          SIGN UP
        </Button>
      </div>

      <AuthModal
        isOpen={!!form}
        form={form}
        handleChangeForm={handleChangeForm}
        onClose={handleOnClose}
      />
    </div>
  );
};

export default AuthBar;

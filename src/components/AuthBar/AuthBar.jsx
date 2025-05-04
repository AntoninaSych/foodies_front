import clsx from 'clsx';
import { useState } from 'react';
import css from '../styles/navigation.module.css';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

const ACTIONS = {
  SIGN_IN: 'sign-in',
  SIGN_UP: 'sign-up',
};

const AuthBar = ({ theme }) => {
  const [form, setForm] = useState(null);
  const className = clsx(css.wrapper, theme && css[theme]);

  const handleClick = action => () => {
    setForm(action);
  };

  const handleSubmit = () => {
    setForm(null);
  };

  const handleChangeForm = action => () => {
    setForm(action);
  };

  return (
    <div className={className}>
      <div className={css.placeholder}>
        <Button onClick={handleClick(ACTIONS.SIGN_IN)}>SIGN IN</Button>
        <Button className={css.active} onClick={handleClick(ACTIONS.SIGN_UP)}>
          SIGN UP
        </Button>
      </div>
      <Modal open={form === ACTIONS.SIGN_UP} onClose={handleSubmit}>
        <RegisterForm
          onSubmit={handleSubmit}
          onChangeForm={handleChangeForm(ACTIONS.SIGN_IN)}
        />
      </Modal>

      <Modal open={form === ACTIONS.SIGN_IN} onClose={handleSubmit}>
        <LoginForm
          onSubmit={handleSubmit}
          onChangeForm={handleChangeForm(ACTIONS.SIGN_UP)}
        />
      </Modal>
    </div>
  );
};

export default AuthBar;

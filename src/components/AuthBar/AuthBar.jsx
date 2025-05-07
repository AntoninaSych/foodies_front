import clsx from 'clsx';
import { useState } from 'react';
import Button from '../Button/Button';
import SignUpModal from '../SignUpModal/SignUpModal';
import SignInModal from '../SignInModal/SignInModal';
import css from '../styles/navigation.module.css';

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

      <SignUpModal
        isOpen={form === ACTIONS.SIGN_UP}
        onClose={handleSubmit}
        handleOnChangeForm={handleChangeForm(ACTIONS.SIGN_IN)}
      />

      <SignInModal
        isOpen={form === ACTIONS.SIGN_IN}
        onClose={handleSubmit}
        handleOnChangeForm={handleChangeForm(ACTIONS.SIGN_UP)}
      />
    </div>
  );
};

export default AuthBar;

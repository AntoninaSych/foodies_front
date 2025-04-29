import clsx from "clsx";
import {useState} from "react";
import css from "../styles/navigation.module.css";
import Button from "../Button/Button.jsx";
import Modal from "../Modal/Modal.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";

const ACTIONS = {
  SIGN_IN: 'sign-in',
  SIGN_UP: 'sign-up',
}

const AuthBar = ({theme}) => {
  const [form, setForm] = useState(null)
  const [active, setActive] = useState(ACTIONS.SIGN_UP)
  const className = clsx(css.wrapper, css[theme]);

  const handleClick = (action) => () => {
    setForm(action)
  }

  const handleSubmit = () => {
    setForm(null)
  }

  const onMouseOver = (action) => () => {
    setActive(action)
  }

  const handleChangeForm = (action) => () => {
    setForm(action)
    setActive(action)
  }

  return (
    <div className={className}>
      <div className={css.placeholder}>
        <Button
          className={active === ACTIONS.SIGN_IN && 'active'}
          onClick={handleClick(ACTIONS.SIGN_IN)}
          variant="auth"
          onMouseOver={onMouseOver(ACTIONS.SIGN_IN)}
        >
          SIGN IN
        </Button>
        <Button
          className={active === ACTIONS.SIGN_UP && 'active'}
          onClick={handleClick(ACTIONS.SIGN_UP)}
          variant="auth"
          onMouseOver={onMouseOver(ACTIONS.SIGN_UP)}
        >
          SIGN UP
        </Button>
      </div>

      <Modal open={form === ACTIONS.SIGN_UP} onClose={handleSubmit}>
        <RegisterForm onSubmit={handleSubmit} onChangeForm={handleChangeForm(ACTIONS.SIGN_IN)} />
      </Modal>

      <Modal open={form === ACTIONS.SIGN_IN} onClose={handleSubmit}>
        <LoginForm onSubmit={handleSubmit} onChangeForm={handleChangeForm(ACTIONS.SIGN_UP)} />
      </Modal>

    </div>
  );
};

export default AuthBar;

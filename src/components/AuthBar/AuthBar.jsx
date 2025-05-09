import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import Button from '../Button/Button';
import { showModal } from '../../redux/common/slice';
import { FORM_TYPES, MODALS } from '../../const';
import css from '../styles/navigation.module.css';

const AuthBar = ({ theme }) => {
  const dispatch = useDispatch();
  const className = clsx(css.wrapper, theme && css[theme]);

  const handleClick = form => () => {
    dispatch(showModal({ modal: MODALS.AUTH, defaultValue: form }));
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
    </div>
  );
};

export default AuthBar;

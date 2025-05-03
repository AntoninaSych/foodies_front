import clsx from 'clsx';
import css from './ButtonIcon.module.css';

const ButtonIcon = ({ onClick, children }) => {
  const clickHandler = event => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  const classNames = clsx(css.button);

  return (
    <button className={classNames} type="button" onClick={clickHandler}>
      {children}
    </button>
  );
};

export default ButtonIcon;

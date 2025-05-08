import clsx from 'clsx';
import { FiLoader } from 'react-icons/fi';
import { TYPES, VARIANTS } from './const';
import css from './Button.module.css';
import { Link } from 'react-router-dom';

const Button = ({
  onClick,
  children,
  href,
  to,
  variant,
  className,
  isLoading,
  type = TYPES.BUTTON,
  disabled = false,
}) => {
  const clickHandler = event => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  const classNames = clsx(css.button, variant && css[variant], className);

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        rel="nofollow noopener"
        target="_blank"
      >
        {children}
      </a>
    );
  } else if (to) {
    return (
      <Link to={to} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={type}
      onClick={clickHandler}
      disabled={disabled}
    >
      {isLoading ? <FiLoader className={css.iconLoading} /> : children}
    </button>
  );
};

Button.variants = Object.assign({}, VARIANTS);
Button.types = Object.assign({}, TYPES);

export default Button;

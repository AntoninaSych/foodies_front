import clsx from "clsx";
import { TYPES, VARIANTS } from "./const";
import css from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({
  onClick,
  children,
  external,
  href,
  to,
  variant = VARIANTS.PRIMARY,
  type = TYPES.BUTTON,
}) => {
  const clickHandler = (event) => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  const className = clsx(css.button, css[variant]);

  if (external) {
    return (
      <a
        href={href}
        className={className}
        rel="nofollow noopener"
        target="_blank"
      >
        {children}
      </a>
    );
  } else if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={clickHandler} className={className}>
      {children}
    </button>
  );
};

Button.variants = Object.assign({}, VARIANTS);
Button.types = Object.assign({}, TYPES);

export default Button;

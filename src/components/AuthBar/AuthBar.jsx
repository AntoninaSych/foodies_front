import clsx from "clsx";
import css from "../styles/navigation.module.css";

const AuthBar = ({theme}) => {
  const className = clsx(css.wrapper, css[theme]);

  return (
    <div className={className}>
      <div className={css.accountPlaceholder}>SIGN IN / SIGN UP</div>
    </div>
  );
};

export default AuthBar;

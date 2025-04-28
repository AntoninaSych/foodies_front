import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { ROUTERS } from "../../const";
import css from "../styles/navigation.module.css";

const buildClassName = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const AuthBar = () => {
  return (
    <div className={css.wrapper}>
      <nav className={css.nav}>
        <NavLink className={buildClassName} to={ROUTERS.HOME}>
          Home
        </NavLink>
        <NavLink className={buildClassName} to={ROUTERS.ADD_RECIPE}>
          Add recipe
        </NavLink>
      </nav>
      <div>SIGN IN / SIGN UP</div>
    </div>
  );
};

export default AuthBar;

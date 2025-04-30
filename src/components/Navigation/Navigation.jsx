import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { ROUTERS } from "../../const";
import css from "../styles/navigation.module.css";
import Account from "./components/Account/Account";

const buildClassName = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = ({theme}) => {
  const className = clsx(css.wrapper, css[theme]);

  return (
    <div className={className}>
      <nav className={css.nav}>
        <NavLink className={buildClassName} to={ROUTERS.HOME}>
          Home
        </NavLink>
        <NavLink className={buildClassName} to={ROUTERS.ADD_RECIPE}>
          Add recipe
        </NavLink>
      </nav>
      <Account theme={theme} />
    </div>
  );
};

export default Navigation;

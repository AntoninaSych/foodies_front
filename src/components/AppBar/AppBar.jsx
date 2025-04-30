import { Link } from "react-router-dom";
import clsx from "clsx";
import Container from "../Container/Container";
import Navigation from "../Navigation/Navigation";
import css from "./AppBar.module.css";
import { ROUTERS } from "../../const";
import {useSelector} from "react-redux";
import AuthBar from "../AuthBar/AuthBar";
import {selectIsLoggedIn} from "../../redux/auth/selectors";

const AppBar = ({theme}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const className = clsx(css.header, css[theme]);

  return (
    <header className={className}>
      <Container>
        <div className={css.wrapper}>
          <div className={css.brand}>
            <Link to={ROUTERS.HOME}>
              <span>foodies</span>
            </Link>
          </div>
          <div className={css.nav}>
            {isLoggedIn ? <Navigation theme={theme} /> : <AuthBar theme={theme} />}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default AppBar;

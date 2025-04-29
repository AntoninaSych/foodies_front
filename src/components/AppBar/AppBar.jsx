import { Link } from "react-router-dom";
import Container from "../Container/Container";
import Navigation from "../Navigation/Navigation";
import css from "./AppBar.module.css";
import { ROUTERS } from "../../const";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/user/selectors";
import AuthBar from "../AuthBar/AuthBar";

const AppBar = () => {
  const user = useSelector(selectUser);

  return (
    <header className={css.header}>
      <Container>
        <div className={css.wrapper}>
          <div className={css.brand}>
            <Link to={ROUTERS.HOME}>
              <span>foodies</span>
            </Link>
          </div>
          <div className={css.nav}>
            {user ? <Navigation /> : <AuthBar />}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default AppBar;

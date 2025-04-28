import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import css from "./NotFoundPage.module.css";
import { ROUTERS } from "../../const";

const NotFoundPage = () => {
  return (
    <Container>
      <div className={css.wrapper}>
        <h1>404 - Page Not Found!</h1>
        <p>
          Let's go to the <Link to={ROUTERS.HOME}>Home</Link> page
        </p>
      </div>
    </Container>
  );
};

export default NotFoundPage;

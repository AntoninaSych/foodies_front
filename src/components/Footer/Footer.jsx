import Container from "../Container/Container";

import css from "./Footer.module.css";

const Footer = () => {
  const year = (new Date()).getFullYear();

  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.wrapper}>@{year}, Foodies. All rights reserved</div>
      </Container>
    </footer>
  );
};

export default Footer;

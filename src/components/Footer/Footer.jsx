import NetworkLinks from "../NetworkLinks/NetworkLinks";
import Container from "../Container/Container";

import css from "./Footer.module.css";

const Footer = () => {
  const year = (new Date()).getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.line}><span className={css.brand}>foodies</span><NetworkLinks/></div>
      <Container>
        <div className={css.wrapper}>@{year}, Foodies. All rights reserved</div>
      </Container>
    </footer>
  );
};

export default Footer;

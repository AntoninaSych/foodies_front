import Container from '../Container/Container';
import css from './Footer.module.css';
import Logo from '../Logo/Logo';
import NetworkLinks from '../NetworkLinks/NetworkLinks';
import Copyright from '../Copyright/Copyright';

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className={css.wrapper}>
          <Logo />
          <NetworkLinks />
        </div>
      </Container>
      <hr className={css.separator} />
      <Container>
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;

import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

import css from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <Container className={css.container}>
        <div className={css.wrap_footer}>
          <div className={css.logo}>foodies</div>

          <div className={css.list_social}>
            <IconButton className={css.item_social} aria-label="Facebook">
              <Facebook className={css.icon} />
            </IconButton>
            <IconButton className={css.item_social} aria-label="Instagram">
              <Instagram className={css.icon} />
            </IconButton>
            <IconButton className={css.item_social} aria-label="Twitter">
              <Twitter className={css.icon} />
            </IconButton>
          </div>
        </div>

        <div className={css.copr}>© {year} Foodies. All rights reserved</div>
      </Container>
    </footer>
  );
};

export default Footer;

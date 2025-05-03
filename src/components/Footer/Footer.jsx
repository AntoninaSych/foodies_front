import Container from '../Container/Container';
import css from './Footer.module.css';

const socialLinks = [
  {
    href: 'https://www.facebook.com/goITclub/',
    iconId: 'facebook',
    label: 'Facebook',
  },
  {
    href: 'https://www.instagram.com/goitclub/',
    iconId: 'instagram',
    label: 'Instagram',
  },
  {
    href: 'https://www.youtube.com/c/GoIT',
    iconId: 'youtube',
    label: 'YouTube',
  },
];

const Footer = () => {
  return (
    <footer>
      <Container className={css.container}>
        <div className={css.wrap_footer}>
          <a href="/" className={css.logo}>
            foodies
          </a>
          <ul className={css.list_social}>
            {socialLinks.map(({ href, iconId, label }) => (
              <li key={iconId} className={css.item_social}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className={css.button_svg}
                  >
                    {/* рамка-кружечко */}
                    <rect
                      x="0.5"
                      y="0.5"
                      width="39"
                      height="39"
                      rx="19.5"
                      stroke="currentColor"
                      fill="none"
                    />
                    {/* символ із sprite.svg, займає весь viewBox */}
                    <use
                      xlinkHref={`/sprite.svg#${iconId}`}
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={css.copr}>
          &copy; 2024, Foodies. All rights reserved
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

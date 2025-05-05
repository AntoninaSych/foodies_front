import css from './NetworkLinks.module.css';
import Link from '../Link/Link';

const socialLinks = [
  {
    href: 'https://www.facebook.com/goITclub/',
    id: 'facebook',
    title: 'Facebook',
  },
  {
    href: 'https://www.instagram.com/goitclub/',
    id: 'instagram',
    title: 'Instagram',
  },
  {
    href: 'https://www.youtube.com/c/GoIT',
    id: 'youtube',
    title: 'YouTube',
  },
];

const NetworkLinks = () => {
  return (
    <ul className={css.list}>
      {socialLinks.map(({ href, id, title }) => (
        <li key={id}>
          <Link href={href} title={title} className={css.link}>
            <svg className={css.icon}>
              <use href={`/sprite.svg#${id}`} />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NetworkLinks;

import css from './NetworkLinks.module.css';

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
      {socialLinks.map(({ href, id, label }) => (
        <li key={id}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={css.link}
          >
            <svg className={css.icon}>
              <use href={`/sprite.svg#${id}`} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NetworkLinks;

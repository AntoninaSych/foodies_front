import css from './NetworkLink.module.css';

const NetworkLink = ({ href, icon, alt }) => {
  return (
    <a
      href={href}
      alt={alt}
      className={css.button}
      rel="nofollow noopener"
      target="_blank"
    >
      <svg className={css.icon}>
        <use href={icon} />
      </svg>
    </a>
  );
};

export default NetworkLink;

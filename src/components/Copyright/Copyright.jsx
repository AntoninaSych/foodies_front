import css from './Copyright.module.css';

const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <div className={css.wrapper}>
      &copy; {year}, Foodies. All rights reserved
    </div>
  );
};

export default Copyright;

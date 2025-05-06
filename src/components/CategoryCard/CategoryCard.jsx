import css from './CategoryCard.module.css';

const CategoryCard = ({ data }) => {
  const { name, thumb } = data;

  return (
    <li className={css.wrapperItems}>
      <div className={css.categoryCard}>
        <img className={css.categoryImg} src={thumb} alt={name} />
        <div className={css.categoryInfo}>
          <div className={css.categoryName}>{name}</div>
          <button className={css.arrowButton}>
            <svg
              className={css.svgArrow}
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 12.75L12.75 5.25"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.25 5.25H12.75V12.75"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

export default CategoryCard;

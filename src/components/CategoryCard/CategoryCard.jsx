import { LuArrowUpRight } from 'react-icons/lu';
import css from './CategoryCard.module.css';

const CategoryCard = ({ data, handleOnCLick }) => {
  const { name, thumb } = data;

  return (
    <li className={css.wrapperItems}>
      <div className={css.categoryCard}>
        <img className={css.categoryImg} src={thumb} alt={name} />
        <div className={css.categoryInfo}>
          <div className={css.categoryName}>{name}</div>
          <button
            onClick={() => handleOnCLick(name)}
            className={css.arrowButton}
          >
            <LuArrowUpRight />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CategoryCard;

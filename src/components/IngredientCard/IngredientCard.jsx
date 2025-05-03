import css from './IngredientCard.module.css';

const IngredientCard = ({ ingredient }) => {
  const { name, thumb, measure } = ingredient;

  return (
    <div className={css.wrapper}>
      <img
        className={css.image}
        src={thumb}
        width={90}
        height={90}
        alt={name}
      />
      <div className={css.content}>
        <div>{name}</div>
        <div className={css.measure}>{measure}</div>
      </div>
    </div>
  );
};

export default IngredientCard;

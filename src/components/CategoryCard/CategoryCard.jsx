import css from "./CategoryCard.module.css";

const CategoryCard = ({data}) => {
  const {name} = data
  return (
    <div className={css.wrapper}>
      <div>{name}</div>
    </div>
  );
};

export default CategoryCard;

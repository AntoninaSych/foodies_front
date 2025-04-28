import css from "./DetailRecipe.module.css";

const DetailRecipe = ({ data }) => {
  console.log('DetailRecipe / data', data)

  return (
    <div className={css.wrapper}>
      <h2>Detail Recipe Page</h2>
    </div>
  );
};

export default DetailRecipe;

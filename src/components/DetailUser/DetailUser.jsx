import css from "./DetailUser.module.css";

const DetailUser = ({data}) => {
  console.log('DetailUser / data', data)

  return (
    <div className={css.wrapper}>
      <h2>Detail User Page</h2>
    </div>
  );
};

export default DetailUser;

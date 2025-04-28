import { useSelector } from "react-redux";
import {
  selectLoading,
  selectError,
  selectCategories
} from "../../redux/categories/selectors";
import css from "./CategoriesList.module.css";
import CategoryCard from "../CategoryCard/CategoryCard";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";

const CategoriesList = () => {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const categories = useSelector(selectCategories);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={css.wrapper}>
      {error && <Message>{error}</Message>}
      {categories.map((card) => (
        <CategoryCard key={card.id} data={card} />
      ))}
    </div>
  );
};

export default CategoriesList;

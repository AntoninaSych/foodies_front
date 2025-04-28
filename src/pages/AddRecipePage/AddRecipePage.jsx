import {useDispatch} from "react-redux";
import { useEffect } from "react";
import Container from "../../components/Container/Container";
import { fetchCategories } from "../../redux/categories/operations";
import css from "./AddRecipePage.module.css";

const AddRecipePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <Container>
        <div>Add recipe page</div>
      </Container>
    </div>
  );
};

export default AddRecipePage;

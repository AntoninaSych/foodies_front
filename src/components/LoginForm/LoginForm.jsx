import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { errorNotification } from "../../utils/notification";
import Button from "../Button/Button";
import FieldInput from "../FieldInput/FieldInput";
import { initialValues } from "./const";
import { validationSchema } from "./const/validation";
import css from "./LoginForm.module.css";
import cssForm from "../styles/form.module.css";

const LoginForm = ({onSubmit, onChangeForm}) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
        onSubmit()
      })
      .catch((error) => {
        errorNotification(error);
      });
  };

  const handleOnChangeForm = (event) => {
    event.preventDefault();
    onChangeForm(event)
  }

  return (
    <div className={css.wrapper}>
      <h2 className={cssForm.title}>SIGN IN</h2>
      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={cssForm.form}>
          <FieldInput name="email" placeholder="Email*" />
          <FieldInput type="password" name="password" placeholder="Password*" />
          <div className={cssForm.actions}>
            <Button type="submit">SIGN IN</Button>
          </div>
          <div className={cssForm.helper}>Don&#39;t have an account? <a href="#" onClick={handleOnChangeForm}>Create an account</a></div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;

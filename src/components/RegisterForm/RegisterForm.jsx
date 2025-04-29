import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import {
  errorNotification,
  successNotification,
} from "../../utils/notification";
import Button from "../Button/Button";
import FieldInput from "../FieldInput/FieldInput";
import { initialValues } from "./const";
import { validationSchema } from "./const/validation";
import css from "./RegisterForm.module.css";
import cssForm from "../styles/form.module.css";

const RegisterForm = ({onSubmit, onChangeForm}) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
        onSubmit()
        successNotification("Success registration");
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
      <h2 className={cssForm.title}>SIGN UP</h2>
      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={cssForm.form}>
          <FieldInput name="name" placeholder="Name*" />
          <FieldInput name="email" placeholder="Email*" />
          <FieldInput type="password" name="password" placeholder="Password*" />
          <div className={cssForm.actions}>
            <Button type="submit">
              CREATE
            </Button>
          </div>
          <div className={cssForm.helper}>I already have an account? <a href="#" onClick={handleOnChangeForm}>Sign in</a></div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;

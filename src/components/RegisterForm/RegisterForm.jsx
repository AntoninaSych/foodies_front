import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import {
  errorNotification,
  successNotification,
} from '../../utils/notification';
import Button from '../Button/Button';
import Link from '../Link/Link';
import FieldInput from '../FieldInput/FieldInput';
import { initialValues } from './const';
import { validationSchema } from './const/validation';
import css from './RegisterForm.module.css';
import cssForm from '../styles/form.module.css';

const RegisterForm = ({ onSubmit, onChangeForm }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
        onSubmit();
        successNotification('Success registration');
      })
      .catch(error => {
        errorNotification(error);
      });
  };

  const handleOnChangeForm = event => {
    event.preventDefault();
    onChangeForm(event);
  };

  return (
    <div className={css.wrapper}>
      <h2 className={cssForm.title}>SIGN UP</h2>
      <Formik
        validateOnBlur={false}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting, dirty }) => (
          <Form className={cssForm.form} onSubmit={handleSubmit}>
            <FieldInput name="name" placeholder="Name*" />
            <FieldInput name="email" placeholder="Email*" />
            <FieldInput
              type="password"
              name="password"
              placeholder="Password*"
            />
            <div className={cssForm.actions}>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || !dirty}
              >
                CREATE
              </Button>
            </div>
            <div className={cssForm.helper}>
              I already have an account?{' '}
              <Link onClick={handleOnChangeForm}>Sign in</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;

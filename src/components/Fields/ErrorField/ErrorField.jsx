import { useForm } from 'react-hook-form';
import css from '../Fields.module.css';

const ErrorField = ({ name }) => {
  const {
    formState: { errors },
  } = useForm();

  return (
    <>
      {errors[name] && (
        <p className={css.error} role="alert">
          {errors[name]?.message}
        </p>
      )}
    </>
  );
};

export default ErrorField;

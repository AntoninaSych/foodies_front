import css from '../Fields.module.css';

const ErrorField = ({ children }) => {
  return (
    <p className={css.errorMessage} role="alert">
      {children}
    </p>
  );
};

export default ErrorField;

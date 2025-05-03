import clsx from 'clsx';
import { useId, useState } from 'react';
import css from '../Fields.module.css';
import ErrorField from '../ErrorField/ErrorField';

const FieldInput = ({
  name,
  label,
  className = '',
  register,
  required,
  placeholder,
  maxLength,
  onChange,
  error,
  strong,
  value,
}) => {
  const [count, setCount] = useState(0);
  const fieldId = useId();
  const defaultMaxLength = maxLength && parseInt(maxLength, 10);

  const handleOnChange = event => {
    const { value } = event.target;
    maxLength && setCount(value.length);
    onChange && onChange(value);
  };

  return (
    <div
      className={clsx(
        css.field,
        className,
        strong && css.strong,
        error && css.error
      )}
    >
      {label && <label htmlFor={fieldId}>{label}</label>}
      <div
        className={clsx(css.inputWrapper, defaultMaxLength && css.withCount)}
      >
        <input
          value={value}
          {...(register && register(name, { required }))}
          placeholder={placeholder}
          onChange={handleOnChange}
          maxLength={defaultMaxLength}
          aria-invalid={error ? 'true' : 'false'}
        />

        {maxLength && (
          <span className={css.count}>
            {count} / {defaultMaxLength}
          </span>
        )}
      </div>
      {error && <ErrorField>{error}</ErrorField>}
    </div>
  );
};

export default FieldInput;

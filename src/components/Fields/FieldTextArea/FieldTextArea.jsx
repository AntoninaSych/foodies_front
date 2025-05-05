import clsx from 'clsx';
import { useEffect, useId, useState } from 'react';
import ErrorField from '../ErrorField/ErrorField';
import css from '../Fields.module.css';

const FieldTextArea = ({
  name,
  label,
  required,
  placeholder,
  register,
  maxLength,
  error,
  value,
  onChange,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const fieldId = useId();
  const defaultMaxLength = maxLength && parseInt(maxLength, 10);

  const handleOnKeyUp = event => {
    const { value } = event.target;
    maxLength && setCount(value.length);
    onChange && onChange(value);
  };

  useEffect(() => {
    if (value === null) {
      setCount(0);
    }
  }, [value]);

  return (
    <div className={clsx(css.field, className, error && css.error)}>
      {label && <label htmlFor={fieldId}>{label}</label>}
      <div
        className={clsx(css.inputWrapper, defaultMaxLength && css.withCount)}
      >
        <textarea
          onKeyUp={handleOnKeyUp}
          {...register(name, { required })}
          placeholder={placeholder}
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

export default FieldTextArea;

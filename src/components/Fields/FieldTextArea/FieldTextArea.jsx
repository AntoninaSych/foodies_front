import clsx from 'clsx';
import { useId, useState } from 'react';
import css from '../Fields.module.css';

const FieldTextArea = ({
  name,
  label,
  className = '',
  register,
  required,
  placeholder,
  maxLength,
}) => {
  const [count, setCount] = useState(0);
  const fieldId = useId();
  const defaultMaxLength = maxLength && parseInt(maxLength, 10);

  const handleCount = event => {
    const { value } = event.target;
    setCount(value.length);
  };

  return (
    <div className={clsx(css.field, className)}>
      {label && <label htmlFor={fieldId}>{label}</label>}
      <div
        className={clsx(css.inputWrapper, defaultMaxLength && css.withCount)}
      >
        <textarea
          {...register(name, { required })}
          placeholder={placeholder}
          onChange={maxLength && handleCount}
          maxLength={defaultMaxLength}
        />

        {maxLength && (
          <span className={css.count}>
            {count} / {defaultMaxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default FieldTextArea;

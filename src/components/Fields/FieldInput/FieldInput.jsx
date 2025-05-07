import clsx from 'clsx';
import { useId, useState } from 'react';
import css from '../Fields.module.css';
import ErrorField from '../ErrorField/ErrorField';

const FieldInput = ({
  name,
  label,
  register,
  required,
  placeholder,
  maxLength,
  onChange,
  error,
  strong,
  value,
  style,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const fieldId = useId();
  const defaultMaxLength = maxLength && parseInt(maxLength, 10);

  const handleOnChange = event => {
    const { value } = event.target;
    maxLength && setCount(value.length);
    onChange && onChange(value);
  };

  const renderInput = () => {
    const defaultProps = {
      placeholder,
      maxLength: defaultMaxLength,
      'aria-invalid': error ? 'true' : 'false',
    };

    if (register) {
      const { onChange: regOnChange, ...field } = register(name, {
        required,
      });

      return (
        <input
          value={value}
          {...field}
          onChange={e => {
            regOnChange(e);
            handleOnChange(e);
          }}
          {...defaultProps}
        />
      );
    }

    return <input value={value} onChange={handleOnChange} {...defaultProps} />;
  };

  return (
    <div
      className={clsx(
        css.field,
        style && css[style],
        className,
        strong && css.strong,
        error && css.error
      )}
    >
      {label && <label htmlFor={fieldId}>{label}</label>}
      <div
        className={clsx(css.inputWrapper, defaultMaxLength && css.withCount)}
      >
        {renderInput()}
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

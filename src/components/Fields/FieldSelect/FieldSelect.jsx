import clsx from 'clsx';
import { useId } from 'react';
import css from '../Fields.module.css';

const FieldSelect = ({
  name,
  placeholder,
  label,
  required,
  register,
  options,
  onChange,
  className = '',
}) => {
  const fieldId = useId();

  const handleChange = event => {
    onChange && onChange(event.target.value);
  };

  return (
    <div className={clsx(css.field, className)}>
      {label && <label htmlFor={fieldId}>{label}</label>}
      <div className={clsx(css.inputWrapper)}>
        <select
          {...(register && register(name, { required }))}
          onChange={handleChange}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FieldSelect;

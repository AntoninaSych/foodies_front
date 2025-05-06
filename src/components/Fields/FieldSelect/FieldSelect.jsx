import clsx from 'clsx';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { useId } from 'react';
import css from '../Fields.module.css';
import ErrorField from '../ErrorField/ErrorField';

const FieldSelect = ({
  name,
  label,
  control,
  options,
  onChange,
  placeholder,
  defaultValue,
  error,
  value,
  notShowErrorMessage,
  className = '',
}) => {
  const fieldId = useId();

  const handleChange = data => {
    onChange && onChange(data);
  };

  const defaultProps = {
    classNamePrefix: 'select',
    className: css.select,
    ariaInvalid: error ? 'true' : 'false',
    onChange: handleChange,
    options,
    value,
    placeholder,
    defaultValue,
  };

  return (
    <div className={clsx(css.field, className, error && css.error)}>
      {label && <label htmlFor={fieldId}>{label}</label>}
      <div className={css.inputWrapper}>
        {control ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Select
                {...defaultProps}
                {...field}
                defaultValue={defaultValue}
                placeholder={placeholder}
              />
            )}
          />
        ) : (
          <Select name={name} {...defaultProps} />
        )}
      </div>
      {error && !notShowErrorMessage && <ErrorField>{error}</ErrorField>}
    </div>
  );
};

export default FieldSelect;

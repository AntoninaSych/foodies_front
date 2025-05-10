import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { useEffect, useId, useRef, useState } from 'react';
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
  onChange,
}) => {
  const [count, setCount] = useState(0);
  const fieldId = useId();
  const ref = useRef(null);
  const { getValues } = useFormContext();
  const defaultMaxLength = maxLength && parseInt(maxLength, 10);
  const { ref: registerRef, ...rest } = register(name, { required });
  const withExtra = !!maxLength;

  const values = getValues();

  const handleOnInput = event => {
    const { value } = event.target;
    onChange && onChange(value);

    if (maxLength) {
      setCount(value.length);
      if (ref.current) {
        ref.current.style.height = '';
        ref.current.style.height = ref.current.scrollHeight + 'px';
      }
    }
  };

  const renderExtra = () => {
    if (maxLength) {
      return (
        <span className={css.count}>
          <span className={count > 0 ? css.currentCount : undefined}>
            {count}
          </span>
          /{defaultMaxLength}
        </span>
      );
    }
  };

  useEffect(() => {
    if (!values[name]) {
      setCount(0);
      if (maxLength && ref.current) {
        ref.current.style.height = '';
      }
    }
  }, [values, name, maxLength]);

  return (
    <div className={clsx(css.field, error && css.error)}>
      {label && <label htmlFor={fieldId}>{label}</label>}
      <div className={clsx(css.textAreaWrapper, withExtra && css.withExtra)}>
        <textarea
          ref={event => {
            registerRef(event);
            ref.current = event;
          }}
          onInput={handleOnInput}
          {...rest}
          placeholder={placeholder}
          maxLength={defaultMaxLength}
          aria-invalid={error ? 'true' : 'false'}
        />
        {withExtra && <div className={css.extra}>{renderExtra()}</div>}
      </div>
      {error && <ErrorField>{error}</ErrorField>}
    </div>
  );
};

export default FieldTextArea;

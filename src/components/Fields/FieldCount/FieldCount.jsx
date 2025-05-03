import { useId, useState } from 'react';
import clsx from 'clsx';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import css from '../Fields.module.css';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';

const FieldCount = ({ label, strong, onChange, className = '', step = 10 }) => {
  const [count, setCount] = useState(step);
  const fieldId = useId();

  const handleOnChange = value => () => {
    const currentValue = count + value;
    if (currentValue > 0) {
      onChange(currentValue);
      setCount(currentValue);
    }
  };

  return (
    <div className={clsx(css.field, className, strong && css.strong)}>
      {label && <label htmlFor={fieldId}>{label}</label>}
      <div className={clsx(css.inputCountWrapper)}>
        <ButtonIcon onClick={handleOnChange(-step)}>
          <FaMinus />
        </ButtonIcon>
        <div className={css.step}>{count} min</div>
        <ButtonIcon onClick={handleOnChange(step)}>
          <FaPlus />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default FieldCount;

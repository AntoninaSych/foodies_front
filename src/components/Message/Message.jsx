import css from './Message.module.css';
import clsx from 'clsx';

const Message = ({ children, className }) => {
  return <div className={clsx(css.container, className)}>{children}</div>;
};

export default Message;

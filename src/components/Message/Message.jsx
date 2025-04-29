import css from "./Message.module.css";

const Message = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

export default Message;

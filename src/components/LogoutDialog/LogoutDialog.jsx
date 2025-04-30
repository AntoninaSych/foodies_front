import Button from "../Button/Button";
import css from "./LogoutDialog.module.css";

const LogoutDialog = ({onSubmit, onCancel}) => {
  const handleSubmit = (event) => {
    onSubmit(event)
  };

  const handleCancel = (event) => {
    onCancel(event)
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Are you logging out?</h2>
      <p className={css.description}>You can always log back in at my time.</p>
          <div className={css.actions}>
            <Button variant="primary" onClick={handleSubmit}>
              LOG OUT
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              CANCEL
            </Button>
          </div>
    </div>
  );
};

export default LogoutDialog;

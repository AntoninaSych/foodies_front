import SignUpForm from '../SignUpForm/SignUpForm';
import Link from '../Link/Link';
import Modal from '../Modal/Modal';
import css from '../styles/modal.module.css';

const SignUpModal = ({ isOpen, onClose, handleOnChangeForm }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={css.wrapper}>
        <h2 className={css.title}>SIGN UP</h2>
        <SignUpForm onSuccess={onClose} />

        {handleOnChangeForm && (
          <div className={css.footer}>
            <span>I already have an account?</span>{' '}
            <Link onClick={handleOnChangeForm}>Sign in</Link>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SignUpModal;

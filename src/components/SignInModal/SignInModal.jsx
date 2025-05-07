import SignInForm from '../SignInForm/SignInForm';
import Link from '../Link/Link';
import Modal from '../Modal/Modal';
import css from '../styles/modal.module.css';

const SignInModal = ({ isOpen, onClose, handleOnChangeForm }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={css.wrapper}>
        <h2 className={css.title}>SIGN IN</h2>
        <SignInForm onSuccess={onClose} />

        {handleOnChangeForm && (
          <div className={css.footer}>
            <span>Don&#39;t have an account?</span>{' '}
            <Link onClick={handleOnChangeForm}>Create an account</Link>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SignInModal;

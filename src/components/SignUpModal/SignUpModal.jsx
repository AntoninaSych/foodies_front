import SignUpForm from '../SignUpForm/SignUpForm';
import Modal from '../Modal/Modal';
import css from '../styles/modal.module.css';

const SignUpModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={css.wrapper}>
        <h2 className={css.title}>SIGN UP</h2>
        <SignUpForm onSuccess={onClose} />
      </div>
    </Modal>
  );
};

export default SignUpModal;

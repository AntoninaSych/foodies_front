import { useDispatch, useSelector } from 'react-redux';
import { selectModal } from '../../redux/common/selectors';
import { closeModal } from '../../redux/common/slice';
import AuthModal from '../AuthModal/AuthModal';
import SignInModal from '../SignInModal/SignInModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import { MODALS } from '../../const';

const ShowModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);

  const handleOnClose = () => {
    dispatch(closeModal());
  };

  switch (modal) {
    case MODALS.AUTH:
      return <AuthModal isOpen onClose={handleOnClose} />;
    case MODALS.SIGN_IN:
      return <SignInModal isOpen onClose={handleOnClose} />;
    case MODALS.SIGN_UP:
      return <SignUpModal isOpen onClose={handleOnClose} />;
    default:
      return null;
  }
};

export default ShowModal;

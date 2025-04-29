import { Box, Modal as ModalComponent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import css from "./Modal.module.css";

const Modal = ({ children, open, onClose }) => {
  return (
    <ModalComponent open={open} onClose={onClose} className={css.overlay}>
      <Box className={css.modal}>
        <div className={css.header}><CloseIcon className={css.closeIcon} onClick={onClose} /></div>
        <div className={css.content}>{children}</div>
      </Box>
    </ModalComponent>
  );
};

export default Modal;

import { useState } from 'react';
import css from './Avatar.module.css';
import { errorNotification } from '../../utils/notification';

const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

const UploadPhoto = ({ name, avatar, handleUploadedFile }) => {
  const [preview, setPreview] = useState(avatar);

  const handleOnChange = event => {
    const blobFile = event.target.files[0];
    const urlImage = URL.createObjectURL(blobFile);
    if (!ALLOWED_TYPES.includes(blobFile.type)) {
      errorNotification('Allowed formats: png, jpeg');
    } else {
      setPreview(urlImage);
      handleUploadedFile(blobFile);
    }
  };

  const renderInput = () => {
    return (
      <>
        <label htmlFor="file-upload" className={css.avatarButton}>
          +
        </label>
        <input
          id="file-upload"
          className={css.hiddenInput}
          name={name}
          type="file"
          onChange={handleOnChange}
        />
      </>
    );
  };

  return (
    <div className={css.wrapper}>
      <div className={css.avatar}>
        {preview && (
          <img className={css.avatarImage} src={preview} alt="Avatar" />
        )}
        {renderInput()}
      </div>
    </div>
  );
};

export default UploadPhoto;

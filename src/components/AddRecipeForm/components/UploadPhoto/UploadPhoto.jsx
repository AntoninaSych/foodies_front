import { useState, useRef } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import css from './UploadPhoto.module.css';

const UploadPhoto = ({ name, handleUploadedFile, register }) => {
  const [preview, setPreview] = useState('');
  const hiddenInputRef = useRef();
  const { ref: registerRef, ...rest } = register(name);

  const handleOnChange = event => {
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
    handleUploadedFile(file);
    hiddenInputRef.current && hiddenInputRef.current.click();
  };

  const uploadLabel = preview ? 'Upload another photo' : 'Upload a photo';

  const Photo = (
    <>
      <label htmlFor="file-upload" className={css.customFileUpload}>
        {!preview && (
          <div className={css.placeholder}>
            <MdAddAPhoto />
          </div>
        )}
        {uploadLabel}
      </label>
      <input
        id="file-upload"
        className={css.fileInput}
        name={name}
        type="file"
        {...rest}
        onChange={handleOnChange}
        ref={e => {
          registerRef(e);
          hiddenInputRef.current = e;
        }}
      />
    </>
  );

  return (
    <div className={css.wrapper}>
      <div className={css.imagePlaceholder}>
        {!preview && Photo}
        {preview && (
          <img className={css.image} src={preview} alt="Uploaded Image" />
        )}
      </div>
      {preview && Photo}
    </div>
  );
};

export default UploadPhoto;

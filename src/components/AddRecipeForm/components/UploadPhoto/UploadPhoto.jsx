import { useState, useRef, useEffect } from 'react';
import { MdAddAPhoto } from 'react-icons/md';
import css from './UploadPhoto.module.css';
import ErrorField from '../../../Fields/ErrorField/ErrorField.jsx';
import { useFormContext } from 'react-hook-form';

const UploadPhoto = ({ name, error, handleUploadedFile, register }) => {
  const { getValues } = useFormContext();
  const [preview, setPreview] = useState(null);
  const hiddenInputRef = useRef();
  const { ref: registerRef, ...rest } = register(name);

  const values = getValues();

  const handleOnChange = event => {
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
    handleUploadedFile(file);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  useEffect(() => {
    if (!values[name]) {
      setPreview(null);
    }
  }, [values, name]);

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
      {error && <ErrorField>{error}</ErrorField>}
    </div>
  );
};

export default UploadPhoto;

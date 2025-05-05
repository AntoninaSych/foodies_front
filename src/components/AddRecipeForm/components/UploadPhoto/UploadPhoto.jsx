import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { MdAddAPhoto } from 'react-icons/md';
import ErrorField from '../../../Fields/ErrorField/ErrorField';
import css from './UploadPhoto.module.css';

const UploadPhoto = ({ name, error, handleUploadedFile }) => {
  const { getValues, clearErrors } = useFormContext();
  const [preview, setPreview] = useState(null);

  const values = getValues();

  const handleOnChange = event => {
    const blobFile = event.target.files[0];
    const urlImage = URL.createObjectURL(blobFile);
    setPreview(urlImage);
    handleUploadedFile(blobFile);
    clearErrors(name);
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
        className={css.hiddenInput}
        name={name}
        type="file"
        onChange={handleOnChange}
      />
    </>
  );

  return (
    <div className={css.wrapper}>
      <div className={clsx(css.imagePlaceholder, preview && css.withPreview)}>
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

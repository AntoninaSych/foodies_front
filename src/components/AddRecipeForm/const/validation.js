import * as yup from 'yup';
import { text } from '../../../utils/validation';

// const MAX_FILE_SIZE = 2000000;

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, text.min(3))
    .max(80, text.max(80))
    .required(text.required()),
  description: yup
    .string()
    .min(3, text.min(3))
    .max(200, text.max(200))
    .required(text.required()),
  // thumb: yup.object().shape({
  //   file: yup
  //     .mixed()
  //     .test('required', 'You need to provide a file', file => {
  //       return !!file;
  //     })
  //     .test('fileSize', 'The file is too large', file => {
  //       //if u want to allow only certain file sizes
  //       return file && file.size <= MAX_FILE_SIZE;
  //     }),
  // }),
});

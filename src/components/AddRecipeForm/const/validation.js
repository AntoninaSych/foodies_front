import * as yup from 'yup';
import { text } from '../../../utils/validation';

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
  instructions: yup
    .string()
    .min(10, text.min(10))
    .max(1000, text.max(1000))
    .required(text.required()),
  category: yup.object().required(text.required()),
  time: yup.string().required(text.required()),
  ingredients: yup
    .array()
    .of(yup.object())
    .min(1, 'Add at least one ingredient'),
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

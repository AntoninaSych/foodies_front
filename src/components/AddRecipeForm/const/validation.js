import * as yup from 'yup';
import { text } from '../../../utils/validation';

const MAX_FILE_SIZE = 1024 * (1024 * 2); // max file size 2MB

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
  time: yup.number().required(text.required()),
  ingredients: yup
    .array()
    .of(yup.object())
    .min(1, 'Add at least one ingredient'),
  thumb: yup
    .mixed()
    .required(text.required('You need to provide a photo'))
    .test('size', 'The photo is too large, max fixe size is 2MB', file => {
      return file && file.size <= MAX_FILE_SIZE;
    })
    .test('type', 'Allowed photo format: png, jpeg', file => {
      return file && ['image/png', 'image/jpeg'].includes(file.type);
    }),
});

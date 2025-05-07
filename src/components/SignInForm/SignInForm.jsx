import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { errorNotification } from '../../utils/notification';
import Button from '../Button/Button';
import { FieldInput } from '../Fields';
import { defaultValues } from './const';
import { validationSchema } from './const/validation';
import css from './SignInForm.module.css';
import cssForm from '../styles/form.module.css';

const SignInForm = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    reValidateMode: 'onChange',
    mode: 'onSubmit',
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = methods;

  const onSubmit = values => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        reset();
        onSuccess && onSuccess();
      })
      .catch(error => {
        errorNotification(error);
      });
  };

  return (
    <div className={css.wrapper}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldInput
            name="email"
            register={methods.register}
            placeholder="Email*"
            error={errors.email && errors.email?.message}
            style="rounded"
            required
          />
          <FieldInput
            type="password"
            name="password"
            register={methods.register}
            placeholder="Password*"
            error={errors.password && errors.password?.message}
            style="rounded"
            required
          />
          <div className={cssForm.actions}>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || !isDirty}
            >
              SIGN IN
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignInForm;

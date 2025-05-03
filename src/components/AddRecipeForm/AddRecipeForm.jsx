import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import Button from '../Button/Button';
import { FieldInput, FieldTextarea, FieldSelect, FieldCount } from '../Fields';
import { defaultValues } from './const';
import { validationSchema } from './const/validation';
import css from './AddRecipeForm.module.css';
import UploadPhoto from './components/UploadPhoto/UploadPhoto';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../redux/categories/selectors';
import { selectIngredients } from '../../redux/ingredients/selectors';
import ButtonIcon from '../ButtonIcon/ButtonIcon.jsx';
import Ingredients from './components/Ingredients/Ingredients.jsx';

const AddRecipeForm = ({ onSubmit }) => {
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const categoriesOptions = useMemo(
    () =>
      categories.map(category => ({
        value: category.id,
        label: category.name,
      })),
    [categories]
  );

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const handleUploadedFile = file => {
    setValue('thumb', file);
  };

  const handleChangeIngredients = values => {
    setValue('ingredients', values);
  };

  const onResetHandler = () => {
    reset();
  };
  const handleTimeChange = value => setValue('time', value);

  return (
    <div className={css.wrapper}>
      <div className={css.sidebar}>
        <UploadPhoto
          name="thumb"
          register={register}
          handleUploadedFile={handleUploadedFile}
        />
      </div>
      <div className={css.content}>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FieldInput
              name="title"
              register={register}
              placeholder="The name of the recipe"
              strong
              required
            />
            <FieldTextarea
              name="description"
              register={register}
              placeholder="Enter a description of the dish"
              maxLength={200}
              required
            />
          </div>
          <div className={css.twoColumns}>
            <FieldSelect
              label="CATEGORY"
              name="category"
              register={register}
              placeholder="Select a category"
              options={categoriesOptions}
              required
            />
            <FieldCount
              label="COOKING TIME"
              name="time"
              register={register}
              placeholder="Enter a description of the dish"
              onChange={handleTimeChange}
              maxLength={200}
              required
            />
          </div>
          <Ingredients
            ingredients={ingredients}
            name="ingredients"
            onChange={handleChangeIngredients}
          />
          <FieldTextarea
            name="instructions"
            register={register}
            placeholder="Enter recipe"
            label="RECIPE PREPARATION"
            maxLength={1000}
            required
          />
          <div className={css.actions}>
            <ButtonIcon variant="secondary" onClick={onResetHandler}>
              <FaRegTrashCan />
            </ButtonIcon>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import Button from '../Button/Button';
import { FieldInput, FieldTextarea, FieldSelect, FieldCount } from '../Fields';
import { defaultValues, resetValues } from './const';
import { validationSchema } from './const/validation';
import css from './AddRecipeForm.module.css';
import UploadPhoto from './components/UploadPhoto/UploadPhoto';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../redux/categories/selectors';
import { selectIngredients } from '../../redux/ingredients/selectors';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import Ingredients from './components/Ingredients/Ingredients';

const AddRecipeForm = ({ onSubmit }) => {
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const [addedIngredients, setAddedIngredients] = useState([]);
  const categoriesOptions = useMemo(
    () =>
      categories.map(category => ({
        value: category.id,
        label: category.name,
      })),
    [categories]
  );

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    reValidateMode: 'onBlur',
    mode: 'onSubmit',
  });

  const {
    setValue,
    clearErrors,
    reset,
    getValues,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const values = getValues();

  const handleUploadedFile = file => {
    setValue('thumb', file);
  };

  const handleAddIngredients = values => {
    const { ingredient, measure } = values;
    const newIngredients = [
      ...addedIngredients,
      { id: ingredient.value, measure },
    ];
    setAddedIngredients(newIngredients);
    setValue('ingredients', newIngredients);
    clearErrors('ingredients');
  };

  const onResetHandler = () => {
    reset(resetValues);
    setAddedIngredients([]);
  };

  const handleOnDeleteIngredient = id => {
    const newIngredients = addedIngredients.filter(i => i.id !== id);
    setAddedIngredients(newIngredients);
    setValue('ingredients', newIngredients);
  };

  const handleTimeChange = value => setValue('time', value);

  return (
    <div className={css.wrapper}>
      <FormProvider {...methods}>
        <div className={css.sidebar}>
          <UploadPhoto
            name="thumb"
            error={errors.thumb && errors.thumb?.message}
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
                error={errors.title && errors.title?.message}
                strong
                required
              />
              <FieldTextarea
                name="description"
                register={register}
                placeholder="Enter a description of the dish"
                error={errors.description && errors.description?.message}
                maxLength={200}
                required
              />
            </div>
            <div className={css.twoColumns}>
              <FieldSelect
                label="CATEGORY"
                name="category"
                control={control}
                placeholder="Select a category"
                options={categoriesOptions}
                error={errors.category && errors.category?.message}
                required
              />
              <FieldCount
                label="COOKING TIME"
                name="time"
                register={register}
                onChange={handleTimeChange}
                value={values.time}
                error={errors.time && errors.time?.message}
              />
            </div>
            <Ingredients
              ingredients={ingredients}
              name="ingredients"
              onDelete={handleOnDeleteIngredient}
              onChange={handleAddIngredients}
              addedIngredients={addedIngredients}
              values={values.ingredients}
              error={errors.ingredients && errors.ingredients?.message}
            />
            <FieldTextarea
              name="instructions"
              register={register}
              placeholder="Enter recipe"
              label="RECIPE PREPARATION"
              error={errors.instructions && errors.instructions?.message}
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
      </FormProvider>
    </div>
  );
};

export default AddRecipeForm;

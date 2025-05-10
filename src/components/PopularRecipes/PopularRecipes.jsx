import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard';
import { selectFavoriteRecipes } from '../../redux/recipes/selectors';
import { getFavoriteRecipes } from '../../redux/recipes/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { popularRecipesFetch } from '../../api/recipesApi';
import { errorHandler } from '../../utils/notification';
import css from './PopularRecipes.module.css';

const PopularRecipes = () => {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getFavoriteRecipes());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await popularRecipesFetch();
        setRecipes(response);
      } catch (error) {
        errorHandler(error, 'Error while fetching popular recipes.');
      }
    };

    fetchData();
  }, []);

  const isFavorite = id => {
    return !Array.isArray(favoriteRecipes)
      ? false
      : favoriteRecipes.some(fav => fav.id === id);
  };
  return (
    <section>
      <div className={css.wrapper}>
        <h3 className={css.title}>POPULAR RECIPES</h3>
        <div className={css.list}>
          {recipes.map(card => (
            <RecipeCard
              key={card.id}
              className={css.listItem}
              recipe={card}
              isFavorite={isFavorite(card.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRecipes;

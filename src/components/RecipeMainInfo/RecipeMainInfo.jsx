import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTERS } from '../../const';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { openModal } from '../../redux/modal/slice';

import css from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ title, category, time, description, recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleAuthorClick = () => {
    if (isLoggedIn) {
      navigate(`${ROUTERS.USER}/${recipe.owner.id}`);
    } else {
      dispatch(openModal('signIn'));
    }
  };

  return (
    <div>
      <h2 className={css.title}>{title}</h2>

      <div className={css.tags}>
        <span className={css.tag}>{category}</span>
        <span className={css.tag}>{time}</span>
      </div>

      <p className={css.description}>{description}</p>

      <div className={css.authorInfo}>
        {recipe.owner && (
          <button className={css.author} onClick={handleAuthorClick}>
            <img
              src={recipe.owner.avatarURL}
              alt={`Avatar ${recipe.owner.name}`}
            />
            <p>{recipe.owner.name}</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeMainInfo;

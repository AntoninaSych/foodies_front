import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTERS } from '../../const';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { SignInModal } from '../SignInModal/SignInModal';

import css from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ title, category, time, description, recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleAuthorClick = () => {
    if (isLoggedIn) {
      navigate(`${ROUTERS.USER}/${recipe.owner.id}`);
    } else {
      dispatch(SignInModal('signIn'));
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

      {recipe.owner && (
        <div className={css.authorInfo}>
          <span className={css.textLabel}>Created by:</span>
          <br />
          <button
            type="button"
            className={css.authorName}
            onClick={handleAuthorClick}
          >
            <img
              className={css.avatar}
              src={recipe.owner.avatarURL}
              alt={`Avatar ${recipe.owner.name}`}
              width={32}
              height={32}
            />
            <p className={css.avatarName}>{recipe.owner.name}</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeMainInfo;

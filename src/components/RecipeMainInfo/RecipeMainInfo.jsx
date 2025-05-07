import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTERS } from '../../const';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import SignInModal from '../SignInModal/SignInModal';

import css from './RecipeMainInfo.module.css';
import { useState } from 'react';

const RecipeMainInfo = ({ title, category, time, description, recipe }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleAuthorClick = () => {
    if (isLoggedIn) {
      navigate(`${ROUTERS.USER}/${recipe.owner.id}`);
    } else {
      setIsOpen(true);
    }
  };

  const handleOnClose = () => {
    setIsOpen(false);
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
      <SignInModal isOpen={isOpen} onClose={handleOnClose} />
    </div>
  );
};

export default RecipeMainInfo;

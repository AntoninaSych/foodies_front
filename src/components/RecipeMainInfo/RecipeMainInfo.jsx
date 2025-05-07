import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTERS } from '../../const';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import SignInModal from '../SignInModal/SignInModal';

import css from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ recipe }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { title, category, time, description, owner } = recipe;

  const handleAuthorClick = () => {
    if (isLoggedIn) {
      navigate(`${ROUTERS.USER}/${owner.id}`);
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
        <span className={css.tag}>{`${time} min`}</span>
      </div>

      <p className={css.description}>{description}</p>

      <div className={css.authorInfo}>
        {owner && (
          <button className={css.author} onClick={handleAuthorClick}>
            <img src={owner.avatarURL} alt={`Avatar ${owner.name}`} />
            <p>{owner.name}</p>
          </button>
        )}
      </div>
      <SignInModal isOpen={isOpen} onClose={handleOnClose} />
    </div>
  );
};

export default RecipeMainInfo;

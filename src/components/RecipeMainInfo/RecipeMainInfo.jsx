import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTERS } from '../../const';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import SignInModal from '../SignInModal/SignInModal';

import css from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ recipe }) => {
  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { title, time, description, category, owner } = recipe;

  const handleAuthorClick = () => {
    if (isLoggedIn) {
      navigate(`${ROUTERS.USER}/${owner.id}`);
    } else {
      setOpenModel(true);
    }
  };

  const handleOnCloseModal = () => {
    setOpenModel(false);
  };

  return (
    <div>
      <h3 className={css.title}>{title}</h3>

      <div className={css.tags}>
        <span className={css.tag}>{category?.name}</span>
        <span className={css.tag}>{`${time} min`}</span>
      </div>

      <p className={css.description}>{description}</p>

      <div className={css.authorInfo}>
        {owner && (
          <button className={css.authorButton} onClick={handleAuthorClick}>
            <img
              src={owner?.avatarURL || '/images/default-avatar.png'}
              alt={`Avatar ${owner?.name}`}
            />
            <div className={css.authorText}>
              <span className={css.authorLabel}>Created by:</span>
              <p className={css.authorName}>{owner?.name}</p>
            </div>
          </button>
        )}
      </div>
      <SignInModal isOpen={openModel} onClose={handleOnCloseModal} />
    </div>
  );
};

export default RecipeMainInfo;

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTERS, MODALS } from '../../const';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { showModal } from '../../redux/common/slice';
import css from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { title, time, description, category, owner } = recipe;

  const handleAuthorClick = () => {
    if (isLoggedIn) {
      navigate(`${ROUTERS.USER}/${owner.id}`);
    } else {
      dispatch(showModal(MODALS.AUTH));
    }
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
    </div>
  );
};

export default RecipeMainInfo;

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import css from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ title, category, time, description, author }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                        className={css.avatar}
                        src={recipe.owner.avatarURL}
                        alt={`Avatar ${recipe.owner.name}`}
                        width={32}
                        height={32}
                      />
                      <p className={css.avatarName}>{recipe.owner.name}</p>
                    </button>
                  )}
        
        <div>
          <span className={css.textLabel}>Created by:</span><br />
          <button
            type="button"
            className={css.authorName}
            onClick={author.onClick} 
          >
            {author.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeMainInfo;
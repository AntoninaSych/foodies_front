import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { MdOutlineArrowOutward } from 'react-icons/md';
import clsx from 'clsx';
import { ROUTERS } from '../../const';
import { errorNotification } from '../../utils/notification';
import Button from '../Button/Button';
import { unfollow, follow } from '../../redux/users/operations';
import css from './UserCard.module.css';
import { useMemo } from 'react';

const UserCard = ({ user, isFollowing, currentUser, handleUnfollow }) => {
  const isTablet = useMediaQuery('(max-width: 1439px)');
  const dispatch = useDispatch();
  const { id, name, avatarURL, allRecipes, recipes = [] } = user;
  const limit = isTablet ? 3 : 4;
  const filteredRecipes = useMemo(() => {
    return isTablet ? recipes.slice(0, limit) : recipes;
  }, [isTablet, limit, recipes]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      dispatch(unfollow(id))
        .unwrap()
        .then(() => {
          handleUnfollow(id);
        })
        .catch(error => {
          errorNotification(error);
        });
    } else {
      dispatch(follow(id))
        .unwrap()
        .then(() => {})
        .catch(error => {
          errorNotification(error);
        });
    }
  };

  return (
    <div className={css.card}>
      <div className={css.userInfoWrapper}>
        <div className={css.userInfo}>
          <img
            className={css.avatar}
            src={avatarURL || '/images/default-avatar.png'}
            alt={`Avatar ${name}`}
            width={32}
            height={32}
          />
          <div className={css.userInfoContent}>
            <h3 className={css.name}>{name}</h3>
            <p className={css.stats}>Recipes: {allRecipes}</p>
            {!currentUser && (
              <Button
                variant="secondary"
                onClick={handleFollowToggle}
                className={clsx(css.button, css.followBtn)}
                small
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            )}
          </div>
        </div>

        <ul className={css.recipeList}>
          {filteredRecipes.map(recipe => (
            <li key={recipe.id} className={css.recipeItem}>
              <Link to={`${ROUTERS.RECIPE_DETAIL}/${recipe.id}`}>
                <img
                  src={recipe.thumb}
                  alt={recipe.title}
                  className={css.recipeThumb}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={css.actions}>
        <Link
          to={`${ROUTERS.USER}/${id}`}
          className={css.iconBtn}
          aria-label="Go to profile"
        >
          <MdOutlineArrowOutward />
        </Link>
      </div>
    </div>
  );
};

export default UserCard;

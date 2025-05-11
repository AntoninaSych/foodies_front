import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineArrowOutward } from 'react-icons/md';
import clsx from 'clsx';
import { selectToken } from '../../redux/auth/selectors';
import { TABS } from '../TabsList/const';
import css from './UserCard.module.css';
import { ROUTERS } from '../../const';
import { followUserApi, unfollowUserApi } from '../../api/authApi';
import { errorHandler, successNotification } from '../../utils/notification';
import Button from '../Button/Button';

const UserCard = ({ user, activeTab, onUnfollow }) => {
  const token = useSelector(selectToken);
  const { id, name, avatarURL, allRecipes, recipes = [] } = user;
  const isFollowing = activeTab === TABS.FOLLOWING;

  const handleFollowToggle = async () => {
    if (!token) return;

    try {
      if (isFollowing) {
        await unfollowUserApi(id);
        onUnfollow && onUnfollow(id);
        successNotification('Successfully unfollow');
      } else {
        await followUserApi(id);
        successNotification('Successfully follow');
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className={css.card}>
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
          {(activeTab === TABS.FOLLOWERS || activeTab === TABS.FOLLOWING) && (
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
        {recipes.map(recipe => (
          <li key={recipe.id} className={css.recipeItem}>
            <img
              src={recipe.thumb}
              alt={recipe.title}
              className={css.recipeThumb}
            />
          </li>
        ))}
      </ul>

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

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineArrowOutward } from 'react-icons/md';
import clsx from 'clsx';

import { followUser, unfollowUser } from '../../redux/auth/operations';
import { selectToken } from '../../redux/auth/selectors';

import css from './UserCard.module.css';

const UserCard = ({ user, activeTab, onUnfollow }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const {
    _id,
    id,
    name,
    avatarURL,
    recipes = [],
    recipesCount,
    isFollowing,
  } = user;

  const userId = _id || id;

  const handleFollowToggle = async () => {
    if (!token) return;

    if (isFollowing) {
      await dispatch(unfollowUser(userId));
      if (activeTab === 'following' && typeof onUnfollow === 'function') {
        onUnfollow(userId);
      }
    } else {
      dispatch(followUser(userId));
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
        <div>
          <h3 className={css.name}>{name}</h3>
          <p className={css.stats}>Recipes: {recipesCount || recipes.length}</p>
        </div>
      </div>

      <ul className={css.recipeList}>
        {recipes.slice(0, 4).map(recipe => (
          <li key={recipe._id || recipe.id} className={css.recipeItem}>
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
          to={`/user/${userId}`}
          className={css.iconBtn}
          aria-label="Go to profile"
        >
          <MdOutlineArrowOutward />
        </Link>

        {(activeTab === 'followers' || activeTab === 'following') && (
          <button
            type="button"
            onClick={handleFollowToggle}
            className={clsx(css.followBtn, isFollowing && css.active)}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;

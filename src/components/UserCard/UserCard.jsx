import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { followUser, unfollowUser } from '../../redux/auth/operations';
import { MdOutlineArrowOutward } from 'react-icons/md';

import styles from './UserCard.module.css';

const UserCard = ({ user, activeTab }) => {
  const dispatch = useDispatch();
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

  const handleFollowToggle = () => {
    if (isFollowing) {
      dispatch(unfollowUser(userId));
    } else {
      dispatch(followUser(userId));
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.userInfo}>
        <img
          src={avatarURL || '/default-avatar.png'}
          alt={name}
          className={styles.avatar}
        />
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.stats}>
            Own recipes: {recipesCount || recipes.length}
          </p>
        </div>
      </div>

      {/* Recipe preview thumbnails */}
      <ul className={styles.recipeList}>
        {recipes.slice(0, 4).map(recipe => (
          <li key={recipe._id || recipe.id} className={styles.recipeItem}>
            <img
              src={recipe.thumb}
              alt={recipe.title}
              className={styles.recipeThumb}
            />
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className={styles.actions}>
        <Link to={`/user/${userId}`} className={styles.iconBtn}>
          <MdOutlineArrowOutward />
        </Link>

        {activeTab === 'followers' || activeTab === 'following' ? (
          <button
            type="button"
            onClick={handleFollowToggle}
            className={styles.followBtn}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default UserCard;

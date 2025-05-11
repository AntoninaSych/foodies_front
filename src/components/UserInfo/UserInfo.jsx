import clsx from 'clsx';
import Button from '../../components/Button/Button';
import css from './UserInfo.module.css';

const UserInfo = ({ userData }) => {
  const { user, createdRecipes, favorites, followers, following } = userData;
  return (
    <div className={css.wrapper}>
      <div className={css.userInfo}>
        <div className={css.avatar}>
          <img
            className={css.avatarImage}
            src={user.avatarURL || '/images/default-avatar.png'}
            alt="avatar"
          />
          <Button
            type="submit"
            variant={Button.variants.PRIMARY}
            className={css.avatarButton}
          >
            +
          </Button>
        </div>
        <h3 className={clsx(css.userName, css.textWrap)}>{user.name}</h3>
        <div className={css.characteristics}>
          <div className={css.characteristic}>
            <span className={css.characteristicTitle}>Email:</span>
            <div className={clsx(css.characteristicInfo, css.textWrap)}>
              {user.email}
            </div>
          </div>
          <div className={css.characteristic}>
            <span className={css.characteristicTitle}>Added recipes:</span>
            <span className={css.characteristicInfo}>{createdRecipes}</span>
          </div>
          {favorites && (
            <div className={css.characteristic}>
              <span className={css.characteristicTitle}>Favorites:</span>
              <span className={css.characteristicInfo}>{favorites}</span>
            </div>
          )}
          <div className={css.characteristic}>
            <span className={css.characteristicTitle}>Followers:</span>
            <span className={css.characteristicInfo}>{followers}</span>
          </div>
          {following && (
            <div className={css.characteristic}>
              <span className={css.characteristicTitle}>Following:</span>
              <span className={css.characteristicInfo}>{following}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

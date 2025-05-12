import clsx from 'clsx';
import css from './UserInfo.module.css';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import { updateAvatar } from '../../api/usersApi';
import { errorHandler, successNotification } from '../../utils/notification';
import { selectToken } from '../../redux/auth/selectors';

const UserInfo = ({ userData }) => {
  const token = useSelector(selectToken);
  const { user, createdRecipes, favorites, followers, following } = userData;

  const handleUploadedFile = async file => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      await updateAvatar(token, formData);
      successNotification('Avatar successfully updated!');
    } catch (error) {
      errorHandler(error, 'Error while updating avatar.');
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.userInfo}>
        <div className={css.avatar}>
          <Avatar
            avatar={user.avatarURL || '/images/default-avatar.png'}
            handleUploadedFile={handleUploadedFile}
          />
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
          <div className={css.characteristic}>
            <span className={css.characteristicTitle}>Favorites:</span>
            <span className={css.characteristicInfo}>{favorites}</span>
          </div>
          <div className={css.characteristic}>
            <span className={css.characteristicTitle}>Followers:</span>
            <span className={css.characteristicInfo}>{followers}</span>
          </div>
          <div className={css.characteristic}>
            <span className={css.characteristicTitle}>Following:</span>
            <span className={css.characteristicInfo}>{following}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

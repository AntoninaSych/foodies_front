import Button from '../../components/Button/Button';
import UserInfo from '../UserInfo/UserInfo';
import css from './DetailUser.module.css';

const DetailUser = ({ user }) => {
  const {
    user: { id },
  } = user;
  console.log(id);
  return (
    <div className={css.wrapper}>
      <div className={css.userInfoTabsWrapper}>
        <div className={css.userInfoWrapper}>
          <UserInfo userData={user}></UserInfo>
          <Button
            type="submit"
            variant={Button.variants.PRIMARY}
            className={css.button}
          >
            Log out
          </Button>
        </div>
        <div
          style={{
            width: '100%',
            height: '100px',
            backgroundColor: 'tan',
          }}
        ></div>
      </div>
    </div>
  );
};

export default DetailUser;

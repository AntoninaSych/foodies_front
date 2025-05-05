// import { useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { /*useDispatch,*/ useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../redux/auth/selectors';
import css from './UserInfo.module.css';
import Button from '../../components/Button/Button';

const UserInfo = ({ id }) => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  //   const location = useLocation();
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  return (
    <div className={css.wrapper}>
      <img
        className={css.avatar}
        src={user.avatarURL ? user.avatarURL.toString() : null}
        width={50}
        height={50}
        alt="avatar"
      />
      <Button type="submit">+</Button>
      {id} {token}
    </div>
  );
};

export default UserInfo;

import clsx from "clsx";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";
import {useState} from "react";
import { ROUTERS } from "../../../../const";
import css from "./Account.module.css";
import cssNavigation from "../../../styles/navigation.module.css";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../../../redux/auth/selectors";
import {logout} from "../../../../redux/auth/operations";

const Account = ({theme}) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const { name, id, avatarURL} = useSelector(selectUser);

  const className = clsx(css.placeholder, css[theme]);

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout());
  };

  const handleOnOpen = () => {
    setOpen(!open)
  };

  return (
    <div className={className}>
      <img className={css.avatar} src={avatarURL.toString()} width={50} height={50} alt="avatar" />
      <div className={css.name}>{name}</div>
      <KeyboardArrowDownIcon className={clsx(css.dropdown, open && css.active)} onClick={handleOnOpen} />

      <div className={clsx(css.menu, open && css.active)}>
        <NavLink className={clsx(cssNavigation.link, css.link)} to={`${ROUTERS.USER}/${id}`}>PROFILE</NavLink>
        <a className={clsx(cssNavigation.link, css.link)} href="#" onClick={handleLogout}>LOG OUT <ArrowBackIcon className={css.arrow} /></a>
      </div>
    </div>
  );
};

export default Account;

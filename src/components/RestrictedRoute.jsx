import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTERS } from "../const";
import {selectIsLoggedIn} from "../redux/auth/selectors";

const RestrictedRoute = ({ component: Component, redirectTo = ROUTERS.HOME }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;

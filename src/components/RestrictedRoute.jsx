import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTERS } from "../const";
import { selectUser } from "../redux/user/selectors";

const RestrictedRoute = ({ component: Component, redirectTo = ROUTERS.HOME }) => {
  const user = useSelector(selectUser);

  return user ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;

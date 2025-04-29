import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "../const";
import { selectUser } from "../redux/user/selectors";

const PrivateRoute = ({ component: Component, redirectTo = ROUTERS.HOME }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate(redirectTo, { state: location });
    }
  }, [redirectTo, user, location, navigate]);

  return Component;
};

export default PrivateRoute;

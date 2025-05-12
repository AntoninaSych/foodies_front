import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTERS } from '../const';
import { selectIsLoggedIn } from '../redux/auth/selectors';

const PrivateRoute = ({ component: Component, redirectTo = ROUTERS.HOME }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(redirectTo, { state: location });
    }
  }, [redirectTo, isLoggedIn, location, navigate]);

  return Component;
};

export default PrivateRoute;

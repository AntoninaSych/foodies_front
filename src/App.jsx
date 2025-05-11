import { lazy } from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomeLayout from './components/Layout/HomeLayout';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/Loader/Loader';
import { selectIsRefreshing } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AddRecipePage = lazy(() => import('./pages/AddRecipePage/AddRecipePage'));
const DetailPage = lazy(() => import('./pages/DetailPage/DetailPage'));
const DetailUserPage = lazy(
  () => import('./pages/DetailUserPage/DetailUserPage')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route
            path="user/profile"
            element={
              <PrivateRoute component={<DetailUserPage current={true} />} />
            }
          />
          <Route
            path="user/:id"
            element={<PrivateRoute component={<DetailUserPage />} />}
          />
          <Route
            path="recipe/add"
            element={<PrivateRoute component={<AddRecipePage />} />}
          />
          <Route path="recipe/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

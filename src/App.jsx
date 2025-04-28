import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
// import RestrictedRoute from "../RestrictedRoute";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const AddRecipePage = lazy(() => import("./pages/AddRecipePage/AddRecipePage"));
const DetailPage = lazy(() => import("./pages/DetailPage/DetailPage"));
const DetailUserPage = lazy(() => import("./pages/DetailUserPage/DetailUserPage"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage")
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="user/:id" element={<PrivateRoute component={<DetailUserPage />} />} />
          <Route path="recipe/add" element={<PrivateRoute component={<AddRecipePage />} />} />
          <Route path="recipe/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

import React, { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operationsAuth";
import { useAuth } from "./hooks/useAuth"; // Import custom hook

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import RestrictedLoginRoute from "./components/RestrictedLoginRoute/RestrictedLoginRoute";

import Loader from "./components/commonComponents/Loader";

import "./App.css";
import ProjectPage from "./pages/ProjectPage/ProjectPage";

// Lazy-loaded components
const LazyWelcomePage = lazy(() => import("./components/Welcome/Welcome"));
const LazyVerifyEmailPage = lazy(() =>
  import("./pages/VerifyEmailPageComponent/VerifyEmailPageComponent")
);
const LazyNotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LazyRegisterPage = lazy(() => import("./pages/RegisterPage"));
const LazyLoginPage = lazy(() => import("./pages/LoginPage"));
const LazyHomePage = lazy(() => import("./pages/HomePage"));
// const LazySharedLayout = lazy(() =>
//   import("./components/SharedLayout/SharedLayout")
// );
const LazyScreenPage = lazy(() => import("./pages/ScreenPage"));

function App() {
  const { isRefreshing } = useAuth(); // Check user verification status
  const dispatch = useDispatch(); // To dispatch actions

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(refreshUser());
    }
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />; // Loader while checking refresh status
  }

  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/welcome" element={<LazyWelcomePage />} />
        <Route
          path="/auth/register"
          element={
            <RestrictedRoute
              component={<LazyRegisterPage />}
              redirectTo="/home"
            />
          }
        />
        <Route
          path="/auth/login"
          element={
            <RestrictedLoginRoute
              component={<LazyLoginPage />}
              redirectTo="/home"
            />
          }
        />
        <Route path="/verify-email" element={<LazyVerifyEmailPage />} />

        {/* Private Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute
              component={<LazyHomePage />}
              redirectTo="/auth/login"
            />
          }>
          <Route
            path="/home/:projectName"
            element={
              <PrivateRoute
                redirectTo="/auth/login"
                component={<ProjectPage />}
              />
            }
          />
          {/* Index Route */}
          <Route index element={<LazyScreenPage />} />
        </Route>

        <Route
          path="/home/screenPage"
          element={
            <PrivateRoute
              component={<LazyScreenPage />}
              redirectTo="/auth/login"
            />
          }
        />

        <Route
          path="*"
          element={<LazyNotFoundPage />} // Catch-all for invalid routes
        />
      </Routes>
    </React.Suspense>
  );
}

export default App;

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operationsAuth";
import { useAuth } from "./hooks/useAuth"; // Import custom hook

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";

import WelcomePage from "./components/Welcome/Welcome";
import RegisterPage from "./pages/RegisterPage"; // Assuming this component exists
import LoginPage from "./pages/LoginPage"; // Assuming this component exists
import VerifyEmailPage from "./pages/VerifyEmailPageComponent/VerifyEmailPageComponent"; // Assuming this component exists
import NotFoundPage from "./pages/NotFoundPage"; // Assuming this component exists
import HomePage from "./pages/HomePage";

import Loader from "./components/commonComponents/Loader";

import "./App.css";

function App() {
  const { isRefreshing } = useAuth(); // Check user verification status
  const dispatch = useDispatch(); // To dispatch actions

  // Dispatch refreshUser when the app starts (or when page is refreshed)
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
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/auth/register"
          element={
            <RestrictedRoute component={<RegisterPage />} redirectTo="/home" />
          }
        />
        <Route
          path="/auth/login"
          element={
            <RestrictedRoute component={<LoginPage />} redirectTo="/home" />
          }
        />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute component={<HomePage />} redirectTo="/auth/login" />
          }
        />
        <Route
          path="/home/*"
          element={
            <PrivateRoute component={<HomePage />} redirectTo="/auth/login" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;

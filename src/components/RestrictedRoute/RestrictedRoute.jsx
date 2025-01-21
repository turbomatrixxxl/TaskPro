import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../commonComponents/Button";

const RestrictedRoute = ({ component, redirectTo = "/" }) => {
  const { isLoggedIn, user } = useAuth();
  // console.log("isLoggedIn:", isLoggedIn);
  // console.log("isRefreshing:", isRefreshing);
  // console.log("user:", user);

  <Button variant={`${user.theme}`}></Button>

  if (user?.verify === false) {
    return <Navigate to={"/verify-email"} />
  }

  // If the user is not logged in, allow access to the page
  return (!isLoggedIn) ? component : <Navigate to={redirectTo} />;
};

export default RestrictedRoute;

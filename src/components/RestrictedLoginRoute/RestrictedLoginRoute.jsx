import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RestrictedLoginRoute = ({ component, redirectTo = "/" }) => {
    const { isLoggedIn } = useAuth();
    // console.log("isLoggedIn:", isLoggedIn);
    // console.log("isRefreshing:", isRefreshing);


    // If the user is not logged in, allow access to the page
    return (!isLoggedIn) ? component : <Navigate to={redirectTo} />;
};

export default RestrictedLoginRoute;
